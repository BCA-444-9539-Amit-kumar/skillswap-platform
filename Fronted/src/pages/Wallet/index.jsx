import { useState } from "react";
import Badge   from "@/components/ui/Badge";
import Button  from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import TopUpModal   from "@/components/modals/TopUpModal";
import WithdrawModal from "@/components/modals/WithdrawModal";
import { DEMO_TRANSACTIONS } from "@/data/demoData";

const ESCROW_ITEMS = [
  { id:"BK-0042", title:"BK-0042 · UI/UX Design",      amount:"₹2,400" },
  { id:"BK-0044", title:"BK-0044 · Spring Boot Dev",   amount:"₹3,100" },
];

const TYPE_VARIANT = { Release:"green", Lock:"amber", "Top Up":"blue", Refund:"purple" };
const STATUS_VARIANT = { success:"green", locked:"amber" };

export default function Wallet() {
  const { walletBalance } = useApp();
  const [topUpOpen,    setTopUpOpen]    = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {/* Balance card */}
        <div style={{ background:"linear-gradient(135deg,#1a2240 0%,#0f1a35 50%,#0b1228 100%)",
          border:"1px solid rgba(91,124,250,0.2)", borderRadius:"var(--radius-lg)", padding:28,
          position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160,
            background:"radial-gradient(circle,rgba(91,124,250,0.15) 0%,transparent 70%)", borderRadius:"50%" }} />
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:4, letterSpacing:"0.3px" }}>Available Balance</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:40, fontWeight:800, letterSpacing:"-1px" }}>
            <span style={{ fontSize:22, fontWeight:400, color:"rgba(255,255,255,0.5)", marginRight:4 }}>₹</span>
            {walletBalance.toLocaleString("en-IN")}
          </div>
          <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:16 }}>
            {["💳 Escrow: ₹5,500","ðŸ“¤ Pending: ₹1,900"].map((chip) => (
              <div key={chip} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:20, padding:"5px 14px", fontSize:12, color:"rgba(255,255,255,0.7)" }}>{chip}</div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, marginTop:16 }}>
            <Button onClick={() => setTopUpOpen(true)}>+ Top Up</Button>
            <button onClick={() => setWithdrawOpen(true)} className="btn"
              style={{ background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.15)", color:"#fff" }}>Withdraw</button>
          </div>
        </div>

        {/* Escrow accounts */}
        <div className="card">
          <div className="card-header"><span className="card-title">Escrow Accounts</span></div>
          <div className="card-body">
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {ESCROW_ITEMS.map((e) => (
                <div key={e.id} style={{ background:"var(--color-surface2)", border:"1px solid var(--color-border)",
                  borderRadius:"var(--radius)", padding:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:500, fontSize:14 }}>{e.title}</div>
                    <div style={{ fontSize:11, color:"var(--color-text3)", marginTop:4 }}>Locked · Releases on completion</div>
                  </div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:18, color:"var(--color-amber)" }}>{e.amount}</div>
                </div>
              ))}
            </div>
            <div style={{ height:1, background:"var(--color-border)", margin:"16px 0" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:14, color:"var(--color-text3)" }}>Total in escrow</span>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, color:"var(--color-amber)" }}>₹5,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Transaction Ledger</span>
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

      <TopUpModal    open={topUpOpen}    onClose={() => setTopUpOpen(false)}    />
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  );
}
