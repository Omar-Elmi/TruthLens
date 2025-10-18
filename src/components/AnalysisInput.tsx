import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisInputProps {
  onAnalysisComplete: (result: any) => void;
}

export const AnalysisInput = ({ onAnalysisComplete }: AnalysisInputProps) => {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log("Analyzing content:", content);
      
      const { data, error } = await supabase.functions.invoke("analyze-text", {
        body: { content },
      });

      if (error) {
        console.error("Analysis error:", error);
        throw error;
      }

      console.log("Analysis result:", data);

      // Store analysis in database
      const { error: dbError } = await supabase.from("analyses").insert({
        content,
        sentiment: data.sentiment,
        sentiment_score: data.sentiment_score,
        misinformation_score: data.misinformation_score,
        topics: data.topics,
        keywords: data.keywords,
      });

      if (dbError) {
        console.error("Database error:", dbError);
      }

      onAnalysisComplete(data);
      
      toast({
        title: "Analysis Complete",
        description: "Your content has been successfully analyzed.",
      });
    } catch (error: any) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Enter Content to Analyze
          </label>
          <Textarea
            placeholder="Paste social media post, news article, or any text content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none bg-secondary border-border focus:border-primary transition-colors"
            disabled={isAnalyzing}
          />
        </div>
        
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !content.trim()}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Analyze Content
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
