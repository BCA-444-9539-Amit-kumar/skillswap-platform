import { useApp } from "@/context/AppContext";

export default function ToastContainer() {
  const { toasts } = useApp();
  const icons = { success:"✓", error:"✖", info:"ℹ️" };

  return (
    <div style={{ position:"fixed", bottom:20, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{icons[t.type] || "•"}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
