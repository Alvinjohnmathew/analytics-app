import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

export default function DeviceChart({ data }) {
  if (!data) return null;
  return (
    <div className="card">
      <div className="card-title">Users by device</div>
      <div className="chart-wrap" style={{height:200}}>
        <Bar data={{
          labels: data.labels,
          datasets:[{ label:'Users', data:data.values, backgroundColor:['#378add','#1d9e75','#d85a30'], borderRadius:4 }]
        }} options={{
          responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}},
          scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(128,128,128,0.1)'}}}
        }} />
      </div>
    </div>
  );
}
