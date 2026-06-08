import { useState } from 'react';

export default function AiInsight({ metrics, apiUrl }) {
  const [insight, setInsight] = useState('Revenue peaked mid-month driven by paid channel conversions. Organic traffic is growing steadily — consider A/B testing landing page CTAs.');
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics }),
      });
      const data = await res.json();
      setInsight(data.insight);
    } catch {
      setInsight('Could not load AI insight. Make sure the backend is running.');
    }
    setLoading(false);
  }

  return (
    <div className="ai-box">
      <div className="ai-box-header">✨ AI insight</div>
      <div className="ai-insight">{insight}</div>
      <button className="ai-btn" onClick={refresh} disabled={loading}>
        {loading ? 'Thinking…' : 'Refresh AI analysis ↗'}
      </button>
    </div>
  );
}
