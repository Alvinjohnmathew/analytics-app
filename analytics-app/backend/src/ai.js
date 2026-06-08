const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateInsight(metrics) {
  const prompt = `You are a data analyst. Given these analytics metrics, write a concise 2-sentence insight with one actionable recommendation. Be specific and business-focused.

Metrics:
- Revenue: $${metrics.revenue?.toLocaleString() ?? 'N/A'} (${metrics.revenueDelta > 0 ? '+' : ''}${metrics.revenueDelta}% vs previous period)
- Active users: ${metrics.users?.toLocaleString() ?? 'N/A'} (${metrics.usersDelta > 0 ? '+' : ''}${metrics.usersDelta}%)
- Conversion rate: ${metrics.conversionRate}% (${metrics.conversionDelta > 0 ? '+' : ''}${metrics.conversionDelta}%)
- Avg session: ${metrics.avgSession}

Respond in plain text only, no markdown.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].text;
}

module.exports = { generateInsight };
