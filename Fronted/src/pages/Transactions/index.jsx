import Badge from "@/components/ui/Badge";
import { DEMO_TRANSACTIONS } from "@/data/demoData";

const TYPE_VARIANT   = { Release:"green", Lock:"amber", "Top Up":"blue", Refund:"purple" };
const STATUS_VARIANT = { success:"green", locked:"amber" };

export default function Transactions() {
  return (
    <div>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:18, marginBottom:24 }}>Transactions</div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">All Transactions</span>
          <select className="form-select" style={{ width:"auto", padding:"6px 10px", fontSize:12 }}>
            <option>All Types</option><option>Escrow Lock</option><option>Escrow Release</option><option>Refund</option><option>Top Up</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Ref ID</th><th>Type</th><th>Booking</th><th>Amount</th><th>Fee</th><th>Net</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {DEMO_TRANSACTIONS.map((t) => (
                <tr key={t.ref}>
                  <td style={{ fontSize:11, color:"var(--color-text3)" }}>{t.ref}</td>
                  <td><Badge variant={TYPE_VARIANT[t.type] || "gray"}>{t.type}</Badge></td>
                  <td style={{ fontSize:14 }}>{t.booking}</td>
                  <td style={{ fontWeight:500, color: t.amount.startsWith("+")?"var(--color-green)":"var(--color-red)" }}>{t.amount}</td>
                  <td style={{ fontSize:11, color:"var(--color-text3)" }}>{t.fee}</td>
                  <td style={{ fontWeight:500, color: t.net.startsWith("-")?"var(--color-red)":"var(--color-green)" }}>{t.net}</td>
                  <td style={{ fontSize:11, color:"var(--color-text3)" }}>{t.date}</td>
                  <td><Badge variant={STATUS_VARIANT[t.status] || "gray"}>{t.status.charAt(0).toUpperCase()+t.status.slice(1)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
