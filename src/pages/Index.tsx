import { useState } from "react";
import { Hero } from "@/components/Hero";
import { AnalysisInput } from "@/components/AnalysisInput";
import { AnalysisResults } from "@/components/AnalysisResults";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <AnalysisInput onAnalysisComplete={setAnalysisResult} />
          </div>
          
          <div className="space-y-6">
            {analysisResult ? (
              <AnalysisResults result={analysisResult} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">Enter content to see analysis results</p>
                  <p className="text-sm mt-2">
                    Our AI will detect sentiment, topics, and misinformation patterns
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
