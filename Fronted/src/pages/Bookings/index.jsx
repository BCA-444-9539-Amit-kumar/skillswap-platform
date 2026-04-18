import { useState } from "react";
import Avatar  from "@/components/ui/Avatar";
import Badge   from "@/components/ui/Badge";
import Button  from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { DEMO_BOOKINGS } from "@/data/demoData";
import { completeBookingApi, releaseEscrowApi } from "@/api";

const STAGES = ["Requested","Accepted","Payment","In Progress","Completed","Funds Released"];

const statusMap = { completed:"green", "in-progress":"amber", pending:"blue" };
const escrowMap = { Released:"green", Locked:"amber", Pending:"blue" };

export default function Bookings() {
  const { addToast, safeCall } = useApp();
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);

  const markComplete = (id) => {
    safeCall(() => completeBookingApi(id), () => {
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status:"completed", escrow:"Locked", canRelease:true } : b));
      addToast('Booking marked complete! Click "Release Funds" to pay provider.', "success");
    });
  };

  const releaseFunds = (id) => {
    safeCall(() => releaseEscrowApi(id), () => {
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, escrow:"Released", canRelease:false } : b));
      addToast("Escrow released! Funds transferred to provider.", "success");
    });
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:18 }}>Bookings</div>
        <Button size="sm">+ New Booking</Button>
      </div>

      {/* Pipeline */}
      <div style={{ display:"flex", marginBottom:24, overflow:"hidden", borderRadius:"var(--radius)" }}>
        {STAGES.map((s, i) => (
          <div key={s} style={{ flex:1, padding:"8px 12px", fontSize:11, fontWeight:600, textAlign:"center",
            textTransform:"uppercase", letterSpacing:"0.5px", borderRight: i<STAGES.length-1 ? "1px solid var(--color-border)" : "none",
            background: i<3?"var(--color-green-bg)":i===3?"var(--color-accent-glow)":"var(--color-surface2)",
            color: i<3?"var(--color-green)":i===3?"var(--color-accent)":"var(--color-text3)" }}>{s}</div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Booking ID</th><th>Service</th><th>Provider</th><th>Duration</th><th>Total</th><th>Escrow</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontSize:11, color:"var(--color-text3)", fontWeight:500 }}>#{b.id}</td>
                  <td>
                    <div style={{ fontSize:14, fontWeight:500 }}>{b.service}</div>
                    <div style={{ fontSize:11, color:"var(--color-text3)" }}>{b.date}</div>
                  </td>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Avatar initials={b.providerAvatar} gradient={b.providerGradient} size={26} fontSize={10} />
                      <span style={{ fontSize:14 }}>{b.provider}</span>
                    </div>
                  </td>
                  <td style={{ fontSize:14 }}>{b.duration}</td>
                  <td style={{ fontWeight:500,
                    color: b.status==="completed"?"var(--color-green)":b.status==="in-progress"?"var(--color-amber)":"var(--color-text2)" }}>₹{b.total.toLocaleString("en-IN")}</td>
                  <td><Badge variant={escrowMap[b.escrow] || "gray"}>{b.escrow}</Badge></td>
                  <td><Badge variant={statusMap[b.status] || "gray"}><span className="dot"/>{b.status.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}</Badge></td>
                  <td>
                    {b.canRelease     ? <Button variant="success" size="sm" onClick={() => releaseFunds(b.id)}>Release Funds</Button>
                    : b.status==="in-progress" ? <Button variant="primary" size="sm" onClick={() => markComplete(b.id)}>Mark Complete</Button>
                    : b.status==="pending"      ? <Button variant="ghost"   size="sm">Cancel</Button>
                    : <span style={{ fontSize:12, color:"var(--color-text3)" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
