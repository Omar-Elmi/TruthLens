-- Create table for storing analysis results
CREATE TABLE public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  sentiment TEXT NOT NULL,
  sentiment_score FLOAT NOT NULL,
  misinformation_score FLOAT NOT NULL,
  topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read analyses (public data)
CREATE POLICY "Anyone can read analyses"
  ON public.analyses
  FOR SELECT
  USING (true);

-- Policy to allow anyone to insert analyses
CREATE POLICY "Anyone can insert analyses"
  ON public.analyses
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_analyses_created_at ON public.analyses(created_at DESC);