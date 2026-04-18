import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Button     from "@/components/ui/Button";
import Modal      from "@/components/ui/Modal";
import AddSkillModal from "@/components/modals/AddSkillModal";

export default function Topbar({ title }) {
  const { addToast } = useApp();
  const navigate     = useNavigate();
  const [search, setSearch]          = useState("");
  const [addSkillOpen, setAddSkill] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 1) navigate("/dashboard/skills");
  };

  return (
    <>
      <header style={{ height:60, background:"var(--color-bg2)", borderBottom:"1px solid var(--color-border)",
        display:"flex", alignItems:"center", padding:"0 28px", gap:16, position:"sticky", top:0, zIndex:90 }}>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:17, flex:1 }}>{title}</div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Search */}
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--color-surface)",
            border:"1px solid var(--color-border)", borderRadius:"var(--radius)", padding:"7px 14px", minWidth:220,
            transition:"all 0.2s", outline:"none" }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="var(--color-text3)">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
            </svg>
            <input value={search} onChange={handleSearch} placeholder="Search skills, users…"
              style={{ background:"none", border:"none", outline:"none", color:"var(--color-text)", fontFamily:"var(--font-body)", fontSize:13, width:"100%" }} />
          </div>
          {/* Bell */}
          <div style={{ width:36, height:36, background:"var(--color-surface)", border:"1px solid var(--color-border)",
            borderRadius:"var(--radius)", display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", position:"relative", fontSize:16 }}
            onClick={() => addToast("No new notifications", "info")}>
            🔔
            <div style={{ position:"absolute", top:7, right:7, width:7, height:7, background:"var(--color-red)",
              borderRadius:"50%", border:"1.5px solid var(--color-bg2)" }} />
          </div>
          <Button size="sm" onClick={() => setAddSkill(true)}>+ Add Skill</Button>
        </div>
      </header>
      <AddSkillModal open={addSkillOpen} onClose={() => setAddSkill(false)} />
    </>
  );
}
