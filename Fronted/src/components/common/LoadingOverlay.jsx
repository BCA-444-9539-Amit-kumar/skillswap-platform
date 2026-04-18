import { useApp } from "@/context/AppContext";

export default function LoadingOverlay() {
  const { isLoading, loadingMsg } = useApp();
  if (!isLoading) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(11,13,17,0.8)", display:"flex",
      alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }}>
      <div style={{ background:"var(--color-surface)", border:"1px solid var(--color-border2)",
        borderRadius:"var(--radius-lg)", padding:"28px 36px", textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid var(--color-border2)",
          borderTopColor:"var(--color-accent)", borderRadius:"50%",
          animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }} />
        <div style={{ fontSize:14, color:"var(--color-text2)" }}>{loadingMsg}</div>
      </div>
    </div>
  );
}
