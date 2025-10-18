import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Hash,
  MessageSquare 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalysisResultsProps {
  result: {
    sentiment: string;
    sentiment_score: number;
    misinformation_score: number;
    confidence: number;
    topics: string[];
    keywords: Array<{ word: string; frequency: number; relevance: number }>;
    reasoning: string;
  };
}

export const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: "success",
      negative: "destructive",
      neutral: "secondary",
      mixed: "warning",
    };
    return colors[sentiment as keyof typeof colors] || "secondary";
  };

  const getMisinformationLevel = (score: number) => {
    if (score < 30) return { level: "Low Risk", color: "success", icon: CheckCircle };
    if (score < 70) return { level: "Medium Risk", color: "warning", icon: AlertTriangle };
    return { level: "High Risk", color: "destructive", icon: AlertTriangle };
  };

  const misinfoLevel = getMisinformationLevel(result.misinformation_score);
  const MisinfoIcon = misinfoLevel.icon;

  const sentimentData = [
    { name: "Positive", value: result.sentiment === "positive" ? 100 : 0 },
    { name: "Negative", value: result.sentiment === "negative" ? 100 : 0 },
    { name: "Neutral", value: result.sentiment === "neutral" ? 100 : 0 },
    { name: "Mixed", value: result.sentiment === "mixed" ? 100 : 0 },
  ].filter(item => item.value > 0);

  const COLORS = {
    positive: "hsl(142, 76%, 36%)",
    negative: "hsl(0, 62.8%, 50.6%)",
    neutral: "hsl(240, 5%, 12%)",
    mixed: "hsl(38, 92%, 50%)",
  };

  const keywordData = result.keywords.slice(0, 8).map(kw => ({
    name: kw.word,
    frequency: kw.frequency,
    relevance: kw.relevance * 100,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Misinformation Score */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Misinformation Assessment</h3>
            <p className="text-sm text-muted-foreground">AI-powered credibility analysis</p>
          </div>
          <div className={`p-2 rounded-lg bg-${misinfoLevel.color}/10`}>
            <MisinfoIcon className={`w-6 h-6 text-${misinfoLevel.color}`} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Risk Level: {misinfoLevel.level}</span>
              <span className="text-2xl font-bold">{result.misinformation_score}%</span>
            </div>
            <Progress 
              value={result.misinformation_score} 
              className="h-3"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm">{result.confidence}%</span>
            </div>
            <Progress 
              value={result.confidence} 
              className="h-2"
            />
          </div>

          {result.reasoning && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Sentiment Analysis */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Sentiment Analysis</h3>
            <p className="text-sm text-muted-foreground">Emotional tone detection</p>
          </div>
          <Badge variant={getSentimentColor(result.sentiment) as any} className="capitalize">
            {result.sentiment}
          </Badge>
        </div>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Topics */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Key Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.topics.map((topic, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-accent/10 border-accent/30 text-accent-foreground"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Keywords */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Keyword Analysis</h3>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={keywordData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 5%, 15%)" />
              <XAxis type="number" stroke="hsl(240, 5%, 64.9%)" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100} 
                stroke="hsl(240, 5%, 64.9%)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(240, 10%, 5%)",
                  border: "1px solid hsl(240, 5%, 15%)",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="frequency" fill="hsl(263, 70%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
