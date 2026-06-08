export default function PagesTable({ pages }) {
  return (
    <div className="pages-card">
      <div className="card-title">Top pages</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Page</th><th>Views</th><th>Bounce rate</th><th>Avg. time</th><th>Trend</th><th>Status</th></tr>
          </thead>
          <tbody>
            {pages.map(p => (
              <tr key={p.page}>
                <td style={{fontWeight:500}}>{p.page}</td>
                <td>{p.views.toLocaleString()}</td>
                <td>{p.bounce}</td>
                <td>{p.avgTime}</td>
                <td>
                  <div className="sparkbar">
                    {p.trend.map((v,i) => (
                      <div key={i} className="sparkbar-b" style={{height:`${Math.round(v/1.3)}%`, opacity: i===6?1:0.45}} />
                    ))}
                  </div>
                </td>
                <td><span className={`badge ${p.status}`}>{p.status.charAt(0).toUpperCase()+p.status.slice(1)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
