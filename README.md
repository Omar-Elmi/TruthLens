TruthLens: Misinformation Detection Platform
Overview

TruthLens is an AI-powered web application inspired by my Cardiff University internship, where I analysed large-scale social media data to detect misinformation and identify trends in public sentiment.

Users can input any text and receive a detailed analysis including:

Misinformation Risk Score (0–100)
Sentiment Detection (Positive, Negative, Neutral)
Topic Identification (3–5 Key Topics)
Keyword Extraction (Most Frequent Words and Phrases)

TruthLens helps users quickly assess the reliability of information, uncover hidden topics, and track trends over time.

Key Features:

Real-time text analysis using custom NLP algorithms
Interactive visualizations with Recharts
Historical storage of analyses for trend tracking
Modern, responsive UI with indigo/violet gradient design

Technologies Used:

Frontend: React, TypeScript, Recharts
Backend / Database: Supabase (cloud-based infrastructure and storage)
AI & NLP: Custom-built algorithms for sentiment analysis, keyword extraction, and topic detection
Design: Fully responsive, modern gradient UI

Key highlights within project

Developed a full-stack web application inspired by real-world social media data analysis
Applied advanced NLP techniques for real-time misinformation detection and sentiment analysis
Delivered interactive data visualisations and an intuitive user interface
Demonstrated expertise in cloud infrastructure, database integration, and AI implementation
Translated internship experience into a practical, standalone application

How to Use

You can run TruthLens locally or deploy it on a server for internal use.

Prerequisites:

Node.js (v18+)
npm or yarn
Supabase account (for backend and database)

Clone the repository
Install dependencies
- npm install

Create a .env file in the project root with your Supabase credentials:

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key

Start the development server:
npm start

Open in your browser:
Go to http://localhost:3000 to access the TruthLens interface and begin analyzing text.

Deployment:

The app can be hosted on platforms like Vercel, Netlify, or any React-compatible server.
Ensure your Supabase credentials are properly configured for the production environment.

