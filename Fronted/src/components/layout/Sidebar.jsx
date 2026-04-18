import { NavLink } from "react-router-dom";
import { useApp }   from "@/context/AppContext";
import Avatar       from "@/components/ui/Avatar";

const NAV = [
  { label:"Overview", items:[
    { to:"/dashboard",           icon:"📊", label:"Dashboard" },
    { to:"/dashboard/skills",     icon:"🔍", label:"Browse Skills" },
    { to:"/dashboard/requests",   icon:"📩", label:"Skill Requests", badge:"3" },
    { to:"/dashboard/bookings",   icon:"📅", label:"Bookings" },
  ]},
  { label:"Finance", items:[
    { to:"/dashboard/wallet",       icon:"💳", label:"Wallet & Escrow" },
    { to:"/dashboard/transactions", icon:"💱", label:"Transactions" },
  ]},
  { label:"Account", items:[
    { to:"/dashboard/profile", icon:"👤", label:"My Profile" },
    { to:"/auth",    icon:"🔐", label:"Sign In / Register", authLabel:"Sign Out" },
  ]},
];

export default function Sidebar() {
  const { user, isAuthenticated, logout } = useApp();
  return (
    <aside style={{ width:240, minHeight:"100vh", background:"var(--color-bg2)",
      borderRight:"1px solid var(--color-border)", display:"flex", flexDirection:"column",
      position:"fixed", top:0, left:0, zIndex:100 }}>

      {/* Logo */}
      <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid var(--color-border)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, background:"linear-gradient(135deg,var(--color-accent),var(--color-purple))",
            borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"var(--font-display)", fontWeight:800, fontSize:16, color:"#fff", flexShrink:0 }}>SS</div>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:18, letterSpacing:"-0.3px" }}>
              Skill<span style={{ color:"var(--color-accent)" }}>Swap</span>
            </div>
            <div style={{ fontSize:10, background:"var(--color-accent-glow)", color:"var(--color-accent)",
              border:"1px solid rgba(91,124,250,0.3)", padding:"2px 7px", borderRadius:20, marginTop:4, display:"inline-block" }}>
              Secure Platform
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
        {NAV.map((section) => (
          <div key={section.label}>
            <div style={{ fontSize:10, letterSpacing:"1.2px", textTransform:"uppercase",
              color:"var(--color-text3)", padding:"14px 10px 6px", fontWeight:500 }}>{section.label}</div>
            {section.items.map((item) => (
              item.to === "/auth" && isAuthenticated ? (
                <button key={item.to} type="button" onClick={logout}
                  style={{
                    display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                    borderRadius:"var(--radius-sm)", cursor:"pointer",
                    transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    color: "var(--color-text2)", background:"transparent",
                    border:"1px solid transparent", fontSize:14, fontWeight:400, marginBottom:2,
                  }}>
                  <span>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.authLabel || item.label}</span>
                </button>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === "/"}
                  style={({ isActive }) => ({
                    display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                    borderRadius:"var(--radius-sm)", cursor:"pointer",
                    transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    color: isActive ? "var(--color-accent)" : "var(--color-text2)",
                    background: isActive ? "var(--color-accent-glow)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(91,124,250,0.2)" : "transparent"}`,
                    fontSize:14, fontWeight: isActive ? 500 : 400, marginBottom:2,
                    textDecoration:"none",
                  })}>
                  <span>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.badge && (
                    <span className="badge badge-blue" style={{ fontSize:10, padding:"2px 7px" }}>{item.badge}</span>
                  )}
                </NavLink>
              )
            ))}
          </div>
        ))}
      </nav>

      {/* User chip */}
      <div style={{ padding:"14px 10px", borderTop:"1px solid var(--color-border)" }}>
        <NavLink to="/dashboard/profile" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
          background:"var(--color-surface)", borderRadius:"var(--radius)", border:"1px solid var(--color-border)",
          cursor:"pointer", textDecoration:"none", transition:"all 0.2s" }}>
          <Avatar initials={user.initials} size={32} fontSize={12} />
          <div style={{ flex:1, overflow:"hidden" }}>
            <div style={{ fontSize:13, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"var(--color-text)" }}>{user.name}</div>
            <div style={{ fontSize:11, color:"var(--color-text3)" }}>{user.role}</div>
          </div>
          <span style={{ color:"var(--color-text3)", fontSize:14 }}>★</span>
        </NavLink>
      </div>
    </aside>
  );
}
