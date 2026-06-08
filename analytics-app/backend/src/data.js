function randSeries(n, base, variance) {
  const out = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - 0.48) * variance;
    out.push(Math.max(0, Math.round(v)));
  }
  return out;
}

function getDateLabels(days) {
  const labels = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(d.toISOString().split('T')[0]);
  }
  return labels;
}

function getMetrics(days, channel) {
  const multiplier = days === 7 ? 0.23 : days === 90 ? 3.1 : 1;
  const channelMult = channel === 'all' ? 1 : 0.35;
  return {
    revenue: Math.round(84210 * multiplier * channelMult),
    revenueDelta: 12.4,
    users: Math.round(14382 * multiplier * channelMult),
    usersDelta: 8.1,
    conversionRate: parseFloat((3.7 * channelMult).toFixed(1)),
    conversionDelta: -0.3,
    avgSession: '4m 12s',
    sessionDelta: 5.8,
  };
}

function getRevenue(days) {
  const labels = getDateLabels(days);
  const revenue = randSeries(days, 2600, 400);
  const target = revenue.map((_, i) => Math.round(2500 + i * 18));
  return { labels, revenue, target };
}

function getTraffic(channel) {
  const all = [
    { name: 'Organic', value: 41, color: '#378add' },
    { name: 'Paid',    value: 29, color: '#1d9e75' },
    { name: 'Referral',value: 18, color: '#d85a30' },
    { name: 'Direct',  value: 12, color: '#888780' },
  ];
  if (channel === 'all') return all;
  return all.filter(c => c.name.toLowerCase() === channel);
}

function getPages() {
  return [
    { page: '/home',     views: 12840, bounce: '34%', avgTime: '3m 20s', trend: [80,90,85,110,120,105,130], status: 'good' },
    { page: '/products', views: 8910,  bounce: '41%', avgTime: '2m 55s', trend: [60,65,70,68,80,78,90],  status: 'good' },
    { page: '/pricing',  views: 5320,  bounce: '58%', avgTime: '1m 42s', trend: [50,48,55,40,45,42,50],  status: 'fair' },
    { page: '/blog',     views: 4100,  bounce: '29%', avgTime: '5m 10s', trend: [30,35,40,50,48,55,60],  status: 'good' },
    { page: '/checkout', views: 2760,  bounce: '72%', avgTime: '0m 58s', trend: [40,38,35,30,28,25,20],  status: 'watch' },
  ];
}

function getSessions() {
  return {
    labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8'],
    sessions: [3200, 3800, 3500, 4100, 4400, 4200, 4900, 5200],
    devices: {
      labels: ['Mobile', 'Desktop', 'Tablet'],
      values: [6820, 5900, 1662],
    },
  };
}

module.exports = { getMetrics, getRevenue, getTraffic, getPages, getSessions };
