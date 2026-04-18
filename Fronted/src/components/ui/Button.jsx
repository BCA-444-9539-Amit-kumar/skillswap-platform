export default function Button({ variant = "primary", size = "", className = "", children, ...props }) {
  return (
    <button className={`btn btn-${variant}${size ? ` btn-${size}` : ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
