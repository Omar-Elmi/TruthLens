import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    if (!content || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing content with Lovable AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert misinformation detection analyst. Analyze text for:
            1. Sentiment (positive, negative, neutral, mixed)
            2. Misinformation likelihood (0-100 score)
            3. Key topics (3-5 topics)
            4. Important keywords (5-10 keywords with frequency)
            
            Respond ONLY with valid JSON in this exact format:
            {
              "sentiment": "positive|negative|neutral|mixed",
              "sentiment_score": 0.0-1.0,
              "misinformation_score": 0-100,
              "confidence": 0-100,
              "topics": ["topic1", "topic2", "topic3"],
              "keywords": [
                {"word": "keyword1", "frequency": 5, "relevance": 0.9},
                {"word": "keyword2", "frequency": 3, "relevance": 0.7}
              ],
              "reasoning": "Brief explanation of the analysis"
            }`
          },
          { role: "user", content: `Analyze this text for misinformation and sentiment:\n\n${content}` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { 
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("Invalid AI response");
    }

    console.log("AI Response:", aiResponse);

    // Parse the JSON response from AI
    let analysis;
    try {
      // Try to extract JSON from the response (in case there's additional text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse AI analysis");
    }

    console.log("Parsed analysis:", analysis);

    return new Response(
      JSON.stringify({
        sentiment: analysis.sentiment,
        sentiment_score: analysis.sentiment_score,
        misinformation_score: analysis.misinformation_score,
        confidence: analysis.confidence,
        topics: analysis.topics,
        keywords: analysis.keywords,
        reasoning: analysis.reasoning,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in analyze-text function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
