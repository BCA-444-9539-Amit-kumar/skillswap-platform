import { useState } from "react";
import Modal  from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { topUpWalletApi } from "@/api";
import { validators } from "@/utils/validators";

export default function TopUpModal({ open, onClose }) {
  const { addToast, safeCall, setWalletBalance } = useApp();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const handleTopUp = () => {
    const err = validators.amount(amount, 1, 1000000);
    if (err) {
      setError(err);
      addToast(err, "error");
      return;
    }
    safeCall(() => topUpWalletApi({ amount: parseInt(amount) }), () => {
      setWalletBalance((b) => b + parseInt(amount));
      onClose();
      setAmount("");
      setError(null);
      addToast(`₹${parseInt(amount).toLocaleString("en-IN")} added to wallet!`, "success");
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Top Up Wallet"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleTopUp}>Add Funds</Button></>}>
      <div className="form-group"><label className="form-label">Amount (₹) *</label>
        <input className="form-input" type="number" placeholder="1000" value={amount} onChange={(e) => { setAmount(e.target.value); setError(null); }} style={error ? { borderColor: "var(--color-red)" } : {}} />
        {error && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{error}</span>}
      </div>
      <div className="form-group"><label className="form-label">Payment Method</label>
        <select className="form-select"><option>UPI / PhonePe / GPay</option><option>Net Banking</option><option>Debit / Credit Card</option></select></div>
    </Modal>
  );
}
