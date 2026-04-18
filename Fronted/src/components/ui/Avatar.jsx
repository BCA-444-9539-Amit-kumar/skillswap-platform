const GRADIENTS = [
  "linear-gradient(135deg,#5b7cfa,#a78bfa)",
  "linear-gradient(135deg,#22d3a0,#0ea5e9)",
  "linear-gradient(135deg,#f472b6,#a78bfa)",
  "linear-gradient(135deg,#f5a623,#fb7185)",
  "linear-gradient(135deg,#a78bfa,#5b7cfa)",
];

export default function Avatar({ initials = "?", gradient, index = 0, size = 32, fontSize = 12 }) {
  const bg = gradient || GRADIENTS[index % GRADIENTS.length];
  return (
    <div style={{ width:size, height:size, minWidth:size, borderRadius:"50%", background:bg,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontWeight:700, fontSize, color:"#fff", fontFamily:"var(--font-display)" }}>
      {initials}
    </div>
  );
}
