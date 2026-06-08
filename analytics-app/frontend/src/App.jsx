import { useState, useEffect } from "react";
import KpiCards from "./components/KpiCards";
import RevenueChart from "./components/RevenueChart";
import TrafficChart from "./components/TrafficChart";
import DeviceChart from "./components/DeviceChart";
import SessionChart from "./components/SessionChart";
import PagesTable from "./components/PagesTable";
import AiInsight from "./components/AiInsight";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [days, setDays] = useState(30);
  const [channel, setChannel] = useState("all");
  const [metrics, setMetrics] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [pages, setPages] = useState([]);
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/metrics?days=${days}&channel=${channel}`).then(r => r.json()),
      fetch(`${API}/api/revenue?days=${days}`).then(r => r.json()),
      fetch(`${API}/api/traffic?channel=${channel}`).then(r => r.json()),
      fetch(`${API}/api/pages`).then(r => r.json()),
      fetch(`${API}/api/sessions`).then(r => r.json()),
    ]).then(([m, rev, traf, pg, sess]) => {
      setMetrics(m);
      setRevenue(rev);
      setTraffic(traf);
      setPages(pg);
      setSessions(sess);
      setLoading(false);
    });
  }, [days, channel]);

  return (
    <div className="app">
      <header className="topbar">
        <h1>📊 Analytics dashboard</h1>
        <div className="filters">
          <select value={days} onChange={e => setDays(Number(e.target.value))}>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <select value={channel} onChange={e => setChannel(e.target.value)}>
            <option value="all">All channels</option>
            <option value="organic">Organic</option>
            <option value="paid">Paid</option>
            <option value="referral">Referral</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading data…</div>
      ) : (
        <>
          <KpiCards metrics={metrics} />
          <AiInsight metrics={metrics} apiUrl={API} />
          <div className="charts-row">
            <RevenueChart data={revenue} />
            <TrafficChart data={traffic} />
          </div>
          <div className="charts-row">
            <DeviceChart data={sessions?.devices} />
            <SessionChart data={sessions} />
          </div>
          <PagesTable pages={pages} />
        </>
      )}
    </div>
  );
}
