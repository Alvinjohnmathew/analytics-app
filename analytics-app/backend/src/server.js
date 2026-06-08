const express = require('express');
const cors = require('cors');
const { generateInsight } = require('./ai');
const { getMetrics, getRevenue, getTraffic, getPages, getSessions } = require('./data');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// KPI metrics
app.get('/api/metrics', (req, res) => {
  const { days = 30, channel = 'all' } = req.query;
  res.json(getMetrics(Number(days), channel));
});

// Revenue time series
app.get('/api/revenue', (req, res) => {
  const { days = 30 } = req.query;
  res.json(getRevenue(Number(days)));
});

// Traffic by channel
app.get('/api/traffic', (req, res) => {
  const { channel = 'all' } = req.query;
  res.json(getTraffic(channel));
});

// Top pages table
app.get('/api/pages', (req, res) => {
  res.json(getPages());
});

// Weekly sessions
app.get('/api/sessions', (req, res) => {
  res.json(getSessions());
});

// AI insight
app.post('/api/insight', async (req, res) => {
  try {
    const { metrics } = req.body;
    const insight = await generateInsight(metrics);
    res.json({ insight });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI insight failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
