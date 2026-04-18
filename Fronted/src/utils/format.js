export const formatINR = (n) =>
  Number(n).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const formatNum = (n) => Number(n).toLocaleString("en-IN");

export const statusVariant = (s) => {
  const map = { completed:"green", "in-progress":"amber", pending:"blue", accepted:"green", declined:"red", locked:"amber", success:"green", released:"green" };
  return map[s?.toLowerCase()] || "gray";
};
