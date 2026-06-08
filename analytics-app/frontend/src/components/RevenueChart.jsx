import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function RevenueChart({ data }) {
  if (!data) return null;
  return (
    <div className="card">
      <div className="card-title">Revenue over time</div>
      <div className="legend">
        <span><span className="legend-dot" style={{background:'#378add'}}></span>Revenue</span>
        <span><span className="legend-dot" style={{background:'#1d9e75'}}></span>Target</span>
      </div>
      <div className="chart-wrap" style={{height:200}}>
        <Line data={{
          labels: data.labels,
          datasets: [
            { label:'Revenue', data: data.revenue, borderColor:'#378add', backgroundColor:'rgba(55,138,221,0.1)', fill:true, tension:0.4, pointRadius:0, borderWidth:2 },
            { label:'Target', data: data.target, borderColor:'#1d9e75', borderDash:[5,4], fill:false, tension:0, pointRadius:0, borderWidth:1.5 },
          ]
        }} options={{
          responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}},
          scales:{
            x:{ticks:{maxTicksLimit:6,font:{size:11}},grid:{display:false}},
            y:{ticks:{callback:v=>'$'+Math.round(v/1000)+'k',font:{size:11}},grid:{color:'rgba(128,128,128,0.1)'}}
          }
        }} />
      </div>
    </div>
  );
}
