import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

export default function TrafficChart({ data }) {
  if (!data) return null;
  return (
    <div className="card">
      <div className="card-title">Traffic by channel</div>
      <div className="chart-wrap" style={{height:200}}>
        <Doughnut data={{
          labels: data.map(d => d.name),
          datasets:[{ data: data.map(d=>d.value), backgroundColor: data.map(d=>d.color), borderWidth:0 }]
        }} options={{
          responsive:true, maintainAspectRatio:false, cutout:'68%',
          plugins:{legend:{position:'bottom',labels:{font:{size:12},boxWidth:12}}}
        }} />
      </div>
    </div>
  );
}
