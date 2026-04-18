import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar  from "./Topbar";

const TITLES = {
  "/dashboard":            "Dashboard",
  "/dashboard/skills":      "Browse Skills",
  "/dashboard/requests":    "Skill Requests",
  "/dashboard/bookings":    "Bookings",
  "/dashboard/wallet":      "Wallet & Escrow",
  "/dashboard/transactions":"Transactions",
  "/dashboard/profile":     "My Profile",
  "/auth":            "Authentication",
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] || "SkillSwap";

  return (
    <div style={{ display:"flex" }}>
      <Sidebar />
      <div style={{ marginLeft:240, flex:1, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Topbar title={title} />
        <main style={{ padding:28, flex:1 }}><Outlet /></main>
      </div>
    </div>
  );
}
