import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { loginApi, registerApi } from "@/api";
import { validators, validateForm } from "@/utils/validators";

export default function Auth() {
  const { addToast, safeCall, login, isAuthenticated } = useApp();
  const navigate   = useNavigate();
  const [tab, setTab] = useState("login");
  const [loginForm,  setLoginForm]  = useState({ email:"admin@skillswap.com", password:"" });
  const [regForm,    setRegForm]    = useState({ name:"", email:"", password:"", phone:"" });
  const [loginErrors, setLoginErrors] = useState({});
  const [regErrors, setRegErrors] = useState({});

  const setL = (k) => (e) => {
    setLoginForm((p) => ({ ...p, [k]: e.target.value }));
    setLoginErrors((prev) => ({ ...prev, [k]: null }));
  };
  const setR = (k) => (e) => {
    setRegForm((p) => ({ ...p, [k]: e.target.value }));
    setRegErrors((prev) => ({ ...prev, [k]: null }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const doLogin = () => {
    const errors = validateForm(loginForm, {
      email: validators.email,
      password: (v) => v ? null : "Password is required",
    });
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      addToast(Object.values(errors)[0], "error");
      return;
    }
    safeCall(() => loginApi(loginForm), () => {
      login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo");
      addToast("Welcome back, Amit Kumar! 🎉", "success");
      navigate("/dashboard");
    });
  };

  const doRegister = () => {
    const errors = validateForm(regForm, {
      name: validators.name,
      email: validators.email,
      password: validators.password,
      phone: validators.phone,
    });
    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      addToast(Object.values(errors)[0], "error");
      return;
    }
    safeCall(() => registerApi(regForm), () => {
      addToast("Account created! Check your email for OTP.", "success");
      setTab("login");
      setRegForm({ name:"", email:"", password:"", phone:"" });
    });
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"var(--color-bg)", position:"relative", overflow:"hidden" }}>
      {/* Background circles */}
      <div style={{ position:"absolute", width:400, height:400, background:"var(--color-accent)", borderRadius:"50%", filter:"blur(80px)", opacity:0.08, top:-100, left:-100 }} />
      <div style={{ position:"absolute", width:300, height:300, background:"var(--color-purple)", borderRadius:"50%", filter:"blur(80px)", opacity:0.08, bottom:-80, right:-80 }} />

      <div style={{ width:420, background:"var(--color-surface)", border:"1px solid var(--color-border2)",
        borderRadius:"var(--radius-lg)", padding:40, position:"relative", zIndex:1, boxShadow:"var(--shadow)" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:48, height:48, background:"linear-gradient(135deg,var(--color-accent),var(--color-purple))",
            borderRadius:14, display:"inline-flex", alignItems:"center", justifyContent:"center",
            fontFamily:"var(--font-display)", fontWeight:800, fontSize:20, color:"#fff", marginBottom:12 }}>SS</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, marginBottom:6 }}>
            {tab==="login" ? "Welcome back" : "Create account"}
          </div>
          <div style={{ fontSize:13, color:"var(--color-text3)" }}>
            {tab==="login" ? "Sign in to your SkillSwap account" : "Start your skill exchange journey"}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, background:"var(--color-bg3)", borderRadius:"var(--radius)", padding:4, marginBottom:24 }}>
          {["login","register"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, textAlign:"center", padding:8, borderRadius:"var(--radius-sm)", fontSize:13, cursor:"pointer",
                transition:"all 0.2s", border:"none", background: tab===t ? "var(--color-surface2)" : "transparent",
                color: tab===t ? "var(--color-text)" : "var(--color-text3)", fontWeight:500, fontFamily:"var(--font-body)" }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <div>
            <div className="form-group"><label className="form-label">Email</label>
              <input className="form-input" type="email" value={loginForm.email} onChange={setL("email")} style={loginErrors.email ? { borderColor: "var(--color-red)" } : {}} />
              {loginErrors.email && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{loginErrors.email}</span>}
            </div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={loginForm.password} onChange={setL("password")} style={loginErrors.password ? { borderColor: "var(--color-red)" } : {}} />
              {loginErrors.password && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{loginErrors.password}</span>}
            </div>
            <Button style={{ width:"100%", justifyContent:"center" }} onClick={doLogin}>Sign In</Button>
            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"18px 0" }}>
              <div style={{ flex:1, height:1, background:"var(--color-border)" }} />
              <span style={{ fontSize:11, color:"var(--color-text3)" }}>demo mode</span>
              <div style={{ flex:1, height:1, background:"var(--color-border)" }} />
            </div>
            <p style={{ fontSize:12, color:"var(--color-text3)", textAlign:"center" }}>Backend offline? Sign in still works in demo mode.</p>
          </div>
        ) : (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div className="form-group"><label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Amit Kumar" value={regForm.name} onChange={setR("name")} style={regErrors.name ? { borderColor: "var(--color-red)" } : {}} />
                {regErrors.name && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{regErrors.name}</span>}
              </div>
              <div className="form-group"><label className="form-label">Phone</label>
                <input className="form-input" placeholder="+91 98765 43210" value={regForm.phone} onChange={setR("phone")} style={regErrors.phone ? { borderColor: "var(--color-red)" } : {}} />
                {regErrors.phone && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{regErrors.phone}</span>}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={regForm.email} onChange={setR("email")} style={regErrors.email ? { borderColor: "var(--color-red)" } : {}} />
              {regErrors.email && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{regErrors.email}</span>}
            </div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min 8 characters" value={regForm.password} onChange={setR("password")} style={regErrors.password ? { borderColor: "var(--color-red)" } : {}} />
              {regErrors.password && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{regErrors.password}</span>}
            </div>
            <Button style={{ width:"100%", justifyContent:"center" }} onClick={doRegister}>Create Account</Button>
          </div>
        )}
      </div>
    </div>
  );
}
