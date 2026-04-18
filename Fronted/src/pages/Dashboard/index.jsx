import { useState }   from "react";
import Avatar  from "@/components/ui/Avatar";
import Badge   from "@/components/ui/Badge";
import Button  from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const STAT_CARDS = [
  { color:"blue",   icon:"📊", id:"skills",   label:"Active Skills",   value:"24",     change:"▲ 3 this week",      dir:"up"  },
  { color:"green",  icon:"💰", id:"balance",  label:"Wallet Balance",  value:"₹12,840",change:"▲ ₹1,200 earned",    dir:"up"  },
  { color:"amber",  icon:"📖", id:"bookings", label:"Active Bookings", value:"7",      change:"▲ 2 pending review",  dir:"up"  },
  { color:"purple", icon:"⏳", id:"escrow",   label:"In Escrow",       value:"₹5,500", change:"3 transactions locked",dir:""   },
];

const RECENT_BOOKINGS = [
  { service:"React Development",  sub:"2 hrs · Jun 15", provider:"Rohit K.",  pa:"RK", pg:"",                                                      status:"completed",   statusLabel:"Completed",   amount:"₹1,200", amtColor:"var(--color-green)"  },
  { service:"UI/UX Design",       sub:"4 hrs · Jun 18", provider:"Priya S.",  pa:"PS", pg:"linear-gradient(135deg,var(--color-green),var(--color-accent))", status:"in-progress", statusLabel:"In Progress", amount:"₹2,400", amtColor:"var(--color-amber)"  },
  { service:"Data Analysis",      sub:"3 hrs · Jun 20", provider:"Meera V.",  pa:"MV", pg:"linear-gradient(135deg,var(--color-purple),var(--color-coral))", status:"pending",     statusLabel:"Pending",     amount:"₹1,900", amtColor:"var(--color-text2)" },
];

const TIMELINE = [
  { dot:"accent", title:"Booking #BK-0041 marked complete",    meta:"React Development · ₹1,200 released → Rohit K. · 2 hrs ago" },
  { dot:"green",  title:"Escrow released for #BK-0039",         meta:"₹900 transferred to Priya S. · 5 hrs ago" },
  { dot:"amber",  title:"New skill request from Suresh A.",      meta:"Requested React Development · 1 day ago" },
  { dot:"accent", title:"Wallet topped up",                      meta:"+₹5,000 added to wallet · 2 days ago" },
];

const STATUS_VARIANT = { completed:"green", "in-progress":"amber", pending:"blue" };
const DOT_COLOR = { accent:"var(--color-accent)", green:"var(--color-green)", amber:"var(--color-amber)" };

export default function Dashboard() {
  const { addToast, safeCall } = useApp();
  const navigate = useNavigate();
  const [reqs, setReqs] = useState([
    { id:1, pa:"SA", pg:"linear-gradient(135deg,#22d3a0,#0ea5e9)", name:"Suresh A.", skill:"React Development", status:"pending" },
    { id:2, pa:"LK", pg:"linear-gradient(135deg,#f472b6,#a78bfa)", name:"Lakshmi K.", skill:"Machine Learning", status:"pending" },
  ]);

  const handleReq = (id, action) => {
    safeCall(() => Promise.resolve(), () => {
      setReqs((r) => r.map((x) => x.id === id ? { ...x, status: action } : x));
      addToast(`Request ${action}!`, action === "accepted" ? "success" : "error");
    });
  };

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {STAT_CARDS.map((s) => (
          <div key={s.id} style={{ background:"var(--color-surface)", border:"1px solid var(--color-border)",
            borderRadius:"var(--radius-lg)", padding:"20px 22px", position:"relative", overflow:"hidden",
            transition:"all 0.2s", cursor:"default" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="var(--shadow-sm)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"20px 20px 0 0",
              background: s.color==="blue"?"var(--color-accent)":s.color==="green"?"var(--color-green)":s.color==="amber"?"var(--color-amber)":"var(--color-purple)" }} />
            <div style={{ width:36, height:36, borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, marginBottom:14,
              background: s.color==="blue"?"var(--color-accent-glow)":s.color==="green"?"var(--color-green-bg)":s.color==="amber"?"var(--color-amber-bg)":"var(--color-purple-bg)" }}>{s.icon}</div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:28, letterSpacing:"-0.5px", marginBottom:3 }}>{s.value}</div>
            <div style={{ fontSize:12, color:"var(--color-text3)", fontWeight:500 }}>{s.label}</div>
            <div style={{ marginTop:10, fontSize:12, display:"flex", alignItems:"center", gap:4,
              color: s.dir==="up"?"var(--color-green)":s.dir==="down"?"var(--color-red)":"var(--color-text3)" }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {/* Recent Bookings */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Bookings</span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/bookings")}>View all →</Button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Service</th><th>Provider</th><th>Status</th><th>Amount</th></tr></thead>
              <tbody>
                {RECENT_BOOKINGS.map((b, i) => (
                  <tr key={i}>
                    <td><div style={{ fontWeight:500, fontSize:14 }}>{b.service}</div><div style={{ fontSize:11, color:"var(--color-text3)" }}>{b.sub}</div></td>
                    <td><div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar initials={b.pa} gradient={b.pg} size={26} fontSize={10} /><span style={{ fontSize:14 }}>{b.provider}</span></div></td>
                    <td><Badge variant={STATUS_VARIANT[b.status]}><span className="dot" />{b.statusLabel}</Badge></td>
                    <td><span style={{ fontWeight:500, color:b.amtColor }}>{b.amount}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Escrow Workflow */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Escrow Workflow</span>
            <Badge variant="green">ACID Safe</Badge>
          </div>
          <div className="card-body">
            <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"16px 8px", flexWrap:"wrap" }}>
              {[
                { circle:"done",    icon:"✓", label:"User pays",   sub:"Wallet deducted" },
                { arrow:true },
                { circle:"done",    icon:"💳", label:"Escrow Lock", sub:"Funds secured" },
                { arrow:true },
                { circle:"active",  icon:"★️", label:"Service",     sub:"In progress" },
                { arrow:true },
                { circle:"pending", icon:"✔️", label:"Complete",    sub:"Mark done" },
                { arrow:true },
                { circle:"pending", icon:"💸", label:"Release",     sub:"Provider paid" },
              ].map((f, i) => f.arrow ? (
                <span key={i} style={{ fontSize:18, color:"var(--color-border2)", flexShrink:0, paddingTop:12 }}>→</span>
              ) : (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:52 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:18, border:"2px solid",
                    background: f.circle==="done"?"var(--color-green-bg)":f.circle==="active"?"var(--color-accent-glow)":"var(--color-surface2)",
                    borderColor: f.circle==="done"?"rgba(34,211,160,0.3)":f.circle==="active"?"rgba(91,124,250,0.4)":"var(--color-border)" }}>{f.icon}</div>
                  <div style={{ fontSize:11, fontWeight:500, textAlign:"center", color:"var(--color-text2)" }}>{f.label}</div>
                  <div style={{ fontSize:10, color:"var(--color-text3)", textAlign:"center" }}>{f.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ height:1, background:"var(--color-border)", margin:"16px 0" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:14, color:"var(--color-text3)" }}>Currently locked</span>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:18, color:"var(--color-green)" }}>₹5,500</span>
            </div>
            <div className="progress-bar" style={{ marginTop:8 }}><div className="progress-fill" style={{ width:"45%" }} /></div>
            <div style={{ fontSize:11, color:"var(--color-text3)", marginTop:4 }}>3 of 7 bookings awaiting completion</div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Quick Requests */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Skill Requests</span>
            <Badge variant="red">3 Pending</Badge>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>From</th><th>Skill</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {reqs.map((r) => (
                  <tr key={r.id}>
                    <td><div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar initials={r.pa} gradient={r.pg} size={26} fontSize={10} /><span style={{ fontSize:14 }}>{r.name}</span></div></td>
                    <td style={{ fontSize:14 }}>{r.skill}</td>
                    <td><Badge variant={r.status==="accepted"?"green":r.status==="declined"?"red":"amber"}>{r.status==="pending"?"Pending":r.status==="accepted"?"Accepted":"Declined"}</Badge></td>
                    <td>
                      {r.status === "pending" ? (
                        <div style={{ display:"flex", gap:6 }}>
                          <Button variant="success" size="sm" onClick={() => handleReq(r.id,"accepted")}>✓</Button>
                          <Button variant="danger"  size="sm" onClick={() => handleReq(r.id,"declined")}>✕</Button>
                        </div>
                      ) : <span style={{ fontSize:12, color:"var(--color-text3)" }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card">
          <div className="card-header"><span className="card-title">Activity Timeline</span></div>
          <div className="card-body">
            <div style={{ position:"relative", paddingLeft:24 }}>
              <div style={{ position:"absolute", left:8, top:0, bottom:0, width:1, background:"var(--color-border)" }} />
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ position:"relative", marginBottom:16 }}>
                  <div style={{ position:"absolute", left:-20, top:3, width:10, height:10, borderRadius:"50%", background:DOT_COLOR[t.dot], border:"2px solid var(--color-bg2)" }} />
                  <div style={{ background:"var(--color-surface)", border:"1px solid var(--color-border)", borderRadius:"var(--radius)", padding:"12px 14px" }}>
                    <div style={{ fontWeight:500, fontSize:13, marginBottom:3 }}>{t.title}</div>
                    <div style={{ fontSize:11, color:"var(--color-text3)" }}>{t.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
