import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";

const FEATURES = [
  "Safe escrow payments for every booking",
  "Discover verified experts quickly",
  "Instant messages and booking flow",
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  return (
    <div style={{ minHeight: "100vh", padding: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #090b10 0%, #0e1220 100%)" }}>
      <div style={{ width: "100%", maxWidth: 1180, position: "relative" }}>
        <div className="landing-blob" style={{ width: 340, height: 340, top: -80, left: -80, background: "rgba(91,124,250,0.22)" }} />
        <div className="landing-blob" style={{ width: 260, height: 260, bottom: -60, right: -40, background: "rgba(167,139,250,0.15)" }} />

        <div className="landing-grid">
          <section style={{ zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-accent)" }} />
              <span style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase" }}>SkillSwap</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: 24, maxWidth: 560 }}>
              Build trust, book services, and get paid with style.
            </h1>
            <p style={{ color: "var(--color-text2)", fontSize: 16, maxWidth: 560, marginBottom: 30, lineHeight: 1.75 }}>
              SkillSwap brings modern freelancing into one polished dashboard. Explore services, request work, and manage payments with secure, transparent workflows.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
              <Button onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}>Get started</Button>
              <button className="btn btn-ghost" type="button" onClick={() => navigate("/auth")}>Sign in</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
              {FEATURES.map((feature) => (
                <div key={feature} className="landing-feature">
                  <span style={{ fontSize: 18, marginBottom: 8, color: "var(--color-accent)" }}>✓</span>
                  <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ position: "relative", zIndex: 1 }}>
            <div className="landing-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--color-text3)", marginBottom: 8 }}>Today’s activity</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>24 new requests</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(91,124,250,0.12)", display: "grid", placeItems: "center", color: "var(--color-accent)" }}>⚡</div>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <div className="landing-card-row">
                  <div style={{ color: "var(--color-text3)", fontSize: 12 }}>Bookings</div>
                  <div style={{ fontWeight: 600 }}>17</div>
                </div>
                <div className="landing-card-row">
                  <div style={{ color: "var(--color-text3)", fontSize: 12 }}>Wallet balance</div>
                  <div style={{ fontWeight: 600 }}>₹12,840</div>
                </div>
                <div className="landing-card-row">
                  <div style={{ color: "var(--color-text3)", fontSize: 12 }}>Provider rating</div>
                  <div style={{ fontWeight: 600 }}>4.8 ★</div>
                </div>
              </div>
              <div style={{ marginTop: 24, padding: 16, borderRadius: "16px", background: "rgba(91,124,250,0.08)", display: "grid", gap: 10 }}>
                <div style={{ fontSize: 13, color: "var(--color-text3)", fontWeight: 600 }}>Live now</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Jiya S.</div>
                    <div style={{ fontSize: 12, color: "var(--color-text3)" }}>UX design review</div>
                  </div>
                  <span className="badge badge-green">In progress</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
