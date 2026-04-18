import { useState } from "react";
import { useApp }   from "@/context/AppContext";
import Avatar       from "@/components/ui/Avatar";
import Badge        from "@/components/ui/Badge";
import Button       from "@/components/ui/Button";
import AddSkillModal from "@/components/modals/AddSkillModal";
import { DEMO_SKILLS, AVATAR_GRADIENTS } from "@/data/demoData";
import { sendRequestApi } from "@/api";

const CATEGORIES = ["", "Development", "Design", "Data Science", "Marketing", "Writing"];

export default function Skills() {
  const { addToast, safeCall } = useApp();
  const [filter, setFilter]   = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [skills]             = useState(DEMO_SKILLS);

  const filtered = filter ? skills.filter((s) => s.cat === filter) : skills;

  const requestSkill = (title) => {
    addToast(`Sending skill request for "${title}"…`, "info");
    safeCall(() => sendRequestApi({ skillTitle: title }), () => {
      addToast(`Request sent for "${title}"! Provider will respond soon.`, "success");
    });
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:18 }}>Browse Skills Marketplace</div>
          <div style={{ fontSize:14, color:"var(--color-text3)", marginTop:4 }}>Discover verified professionals. All payments secured by escrow.</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <select className="form-select" style={{ width:"auto", padding:"8px 12px" }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c || "All Categories"}</option>)}
          </select>
          <Button onClick={() => setAddOpen(true)}>+ List Your Skill</Button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
        {filtered.map((s, i) => (
          <div key={s.id} onClick={() => requestSkill(s.title)}
            style={{ background:"var(--color-surface)", border:"1px solid var(--color-border)",
              borderRadius:"var(--radius-lg)", padding:20, cursor:"pointer", transition:"all 0.2s", position:"relative", overflow:"hidden" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(91,124,250,0.3)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="var(--shadow-sm)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor="var(--color-border)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div>
                <div style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:12, color:"var(--color-text3)" }}>{s.level} · {s.years} yrs exp</div>
              </div>
              <Badge variant="blue">{s.cat}</Badge>
            </div>
            <div style={{ fontSize:13, color:"var(--color-text2)", lineHeight:1.6, marginBottom:14 }}>{s.desc}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Avatar initials={s.avatar} gradient={AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} size={22} fontSize={8} />
                <span style={{ fontSize:11 }}>{s.provider}</span>
              </div>
              {s.verified
                ? <Badge variant="green" style={{ fontSize:9 }}>✓ Verified</Badge>
                : <Badge variant="amber" style={{ fontSize:9 }}>Pending</Badge>}
              <span style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"var(--color-accent)" }}>₹{s.rate}/hr</span>
            </div>
          </div>
        ))}
      </div>

      <AddSkillModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
