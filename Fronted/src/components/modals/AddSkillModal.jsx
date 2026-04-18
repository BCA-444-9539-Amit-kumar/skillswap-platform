import { useState } from "react";
import Modal  from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { addSkillApi } from "@/api";
import { validators } from "@/utils/validators";

export default function AddSkillModal({ open, onClose }) {
  const { addToast, safeCall } = useApp();
  const [form, setForm] = useState({ title:"", category:"Development", hourlyRate:"", description:"" });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: null })); };

  const handleSubmit = () => {
    const newErrors = {
      title: validators.skillTitle(form.title),
      hourlyRate: validators.skillRate(form.hourlyRate),
      description: validators.description(form.description),
    };
    if (Object.values(newErrors).some(e => e)) {
      setErrors(newErrors);
      addToast(Object.values(newErrors).find(e => e), "error");
      return;
    }
    safeCall(() => addSkillApi(form), () => {
      onClose();
      setForm({ title:"", category:"Development", hourlyRate:"", description:"" });
      setErrors({});
      addToast(`"${form.title}" listed! Awaiting admin verification.`, "success");
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="List a New Skill"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSubmit}>List Skill</Button></>}>
      <div className="form-group"><label className="form-label">Skill Title *</label>
        <input className="form-input" placeholder="e.g. React.js Development" value={form.title} onChange={set("title")} style={errors.title ? { borderColor: "var(--color-red)" } : {}} />
        {errors.title && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.title}</span>}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="form-group"><label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={set("category")}>
            {["Development","Design","Data Science","Marketing","Writing"].map(c=><option key={c}>{c}</option>)}
          </select></div>
        <div className="form-group"><label className="form-label">Hourly Rate (₹) *</label>
          <input className="form-input" type="number" placeholder="500" value={form.hourlyRate} onChange={set("hourlyRate")} style={errors.hourlyRate ? { borderColor: "var(--color-red)" } : {}} />
          {errors.hourlyRate && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.hourlyRate}</span>}
        </div>
      </div>
      <div className="form-group"><label className="form-label">Description *</label>
        <textarea className="form-textarea" placeholder="Describe your expertise…" value={form.description} onChange={set("description")} style={errors.description ? { borderColor: "var(--color-red)" } : {}} />
        {errors.description && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{errors.description}</span>}
      </div>
    </Modal>
  );
}
