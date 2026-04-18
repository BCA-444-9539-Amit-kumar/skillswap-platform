import { useState } from "react";
import Avatar  from "@/components/ui/Avatar";
import Badge   from "@/components/ui/Badge";
import Button  from "@/components/ui/Button";
import Modal   from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import { updateProfileApi } from "@/api";
import { validators } from "@/utils/validators";

export default function Profile() {
  const { addToast, safeCall } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name:"Amit Kumar", email:"amit@skillswap.com", phone:"+91 98765 43210", bio:"Full-stack developer specializing in Spring Boot and React.js.", city:"Mumbai, Maharashtra" });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: null })); };

  const save = () => {
    const newErrors = {
      name: validators.name(form.name),
      email: validators.email(form.email),
      phone: validators.phone(form.phone),
      city: validators.city(form.city),
      bio: validators.bio(form.bio),
    };
    if (Object.values(newErrors).some(e => e)) {
      setErrors(newErrors);
      addToast(Object.values(newErrors).find(e => e), "error");
      return;
    }
    safeCall(() => updateProfileApi(form), () => {
      setEditOpen(false);
      setErrors({});
      addToast("Profile updated successfully!", "success");
    });
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,var(--color-surface) 0%,var(--color-surface2) 100%)",
        border:"1px solid var(--color-border)", borderRadius:"var(--radius-lg)", padding:28,
        display:"flex", alignItems:"center", gap:22, marginBottom:20, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200,
          background:"radial-gradient(circle,var(--color-accent-glow),transparent 70%)" }} />
        <Avatar initials="AK" size={64} fontSize={24} />
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, marginBottom:3 }}>{form.name}</div>
          <div style={{ color:"var(--color-text2)", fontSize:14, marginBottom:12 }}>{form.bio}</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["Spring Boot","React.js","MySQL","AWS","Docker"].map((tag) => (
              <span key={tag} style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:20,
                fontSize:11, background:"var(--color-surface2)", border:"1px solid var(--color-border)", color:"var(--color-text2)" }}>{tag}</span>
            ))}
          </div>
        </div>
        <Button onClick={() => setEditOpen(true)}>Edit Profile</Button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Info */}
        <div className="card">
          <div className="card-header"><span className="card-title">Account Info</span></div>
          <div className="card-body">
            {[["Email", form.email],["Phone", form.phone],["Location", form.city],["Member Since","June 2024"],["Account Type","Provider · Admin"]].map(([label, val]) => (
              <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--color-border)" }}>
                <span style={{ fontSize:13, color:"var(--color-text3)" }}>{label}</span>
                <span style={{ fontSize:13, fontWeight:500 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <div className="card-header"><span className="card-title">Stats & Badges</span></div>
          <div className="card-body">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
              {[["Total Earnings","₹48,200","green"],["Skills Listed","9","accent"],["Avg Rating","4.8 â˜…","amber"],["Completed","34","green"]].map(([label, val, color]) => (
                <div key={label} style={{ background:"var(--color-surface2)", border:"1px solid var(--color-border)", borderRadius:"var(--radius)", padding:14, textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, color:`var(--color-${color})` }}>{val}</div>
                  <div style={{ fontSize:11, color:"var(--color-text3)", marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["ðŸ† Top Provider","✔ 5-Star","💳 Escrow Pro","✓ ID Verified"].map((b) => (
                <Badge key={b} variant="blue">{b}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile"
        footer={<><Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button><Button onClick={save}>Save Changes</Button></>}>
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={set("name")} style={errors.name ? { borderColor: "var(--color-red)" } : {}} />{errors.name && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.name}</span>}</div>
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={form.email} onChange={set("email")} style={errors.email ? { borderColor: "var(--color-red)" } : {}} />{errors.email && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.email}</span>}</div>
        <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={set("phone")} style={errors.phone ? { borderColor: "var(--color-red)" } : {}} />{errors.phone && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.phone}</span>}</div>
        <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.city} onChange={set("city")} style={errors.city ? { borderColor: "var(--color-red)" } : {}} />{errors.city && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.city}</span>}</div>
        <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" value={form.bio} onChange={set("bio")} style={errors.bio ? { borderColor: "var(--color-red)" } : {}} />{errors.bio && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.bio}</span>}</div>
      </Modal>
    </div>
  );
}
