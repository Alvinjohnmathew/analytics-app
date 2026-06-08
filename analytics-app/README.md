# Analytics Dashboard

A full-stack analytics dashboard with AI-powered insights.

## Tech Stack
- **Frontend:** React + Vite + Chart.js
- **Backend:** Node.js + Express
- **AI:** Anthropic Claude API

## Project Structure
```
analytics-app/
├── frontend/   # React app
└── backend/    # Express API
```

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000

## Features
- KPI cards (revenue, users, conversion, session)
- Revenue vs target line chart
- Traffic by channel donut chart
- Users by device bar chart
- Weekly sessions chart
- Top pages table with sparklines
- AI-powered insights via Claude API
- Time range & channel filters
