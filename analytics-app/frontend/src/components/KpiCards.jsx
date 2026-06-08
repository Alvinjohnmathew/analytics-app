export default function KpiCards({ metrics }) {
  if (!metrics) return null;
  const cards = [
    { label: 'Total revenue', value: '$' + metrics.revenue?.toLocaleString(), delta: metrics.revenueDelta, suffix: '%' },
    { label: 'Active users', value: metrics.users?.toLocaleString(), delta: metrics.usersDelta, suffix: '%' },
    { label: 'Conversion rate', value: metrics.conversionRate + '%', delta: metrics.conversionDelta, suffix: '%' },
    { label: 'Avg. session', value: metrics.avgSession, delta: metrics.sessionDelta, suffix: '%' },
  ];
  return (
    <div className="kpis">
      {cards.map(c => (
        <div className="kpi" key={c.label}>
          <div className="kpi-label">{c.label}</div>
          <div className="kpi-value">{c.value}</div>
          <div className={`kpi-delta ${c.delta >= 0 ? 'up' : 'dn'}`}>
            {c.delta >= 0 ? '↑' : '↓'} {Math.abs(c.delta)}{c.suffix} vs prev
          </div>
        </div>
      ))}
    </div>
  );
}
