import { Shield, TrendingUp, Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Misinformation
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Detection Platform
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced NLP and sentiment analysis to detect misinformation patterns, 
            analyze sentiment trends, and identify key topics in real-time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Text Analysis"
              description="Deep semantic analysis with topic modeling"
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Sentiment Detection"
              description="Multi-dimensional sentiment scoring"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Misinformation Score"
              description="AI-powered credibility assessment"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="group relative p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
