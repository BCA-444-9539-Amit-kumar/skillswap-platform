import { useState } from "react";
import Modal  from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { withdrawWalletApi } from "@/api";
import { validators } from "@/utils/validators";

export default function WithdrawModal({ open, onClose }) {
  const { addToast, safeCall } = useApp();
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [error, setError] = useState(null);

  const handleWithdraw = () => {
    const err = validators.amount(amount, 100, 100000);
    if (err) {
      setError(err);
      addToast(err, "error");
      return;
    }
    if (!bankAccount) {
      setError("Please select a bank account");
      addToast("Please select a bank account", "error");
      return;
    }
    safeCall(() => withdrawWalletApi({ amount: parseInt(amount), bankAccount }), () => {
      onClose();
      setAmount("");
      setBankAccount("");
      setError(null);
      addToast(`₹${parseInt(amount).toLocaleString("en-IN")} withdrawal initiated. 1-2 business days.`, "success");
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Withdraw Funds"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleWithdraw}>Withdraw</Button></>}>
      <div className="form-group"><label className="form-label">Amount (₹) *</label>
        <input className="form-input" type="number" placeholder="500" value={amount} onChange={(e) => { setAmount(e.target.value); setError(null); }} style={error ? { borderColor: "var(--color-red)" } : {}} />
        {error && amount && !validators.amount(amount, 100) && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{error}</span>}
      </div>
      <div className="form-group"><label className="form-label">Bank Account *</label>
        <select className="form-select" value={bankAccount} onChange={(e) => { setBankAccount(e.target.value); setError(null); }} style={error && !bankAccount ? { borderColor: "var(--color-red)" } : {}}>
          <option value="">Select a bank account</option>
          <option>HDFC Bank ••••4521</option>
          <option>SBI ••••7890</option>
        </select>
        {error && !bankAccount && <span style={{ fontSize: 12, color: "var(--color-red)", marginTop: 4, display: "block" }}>{error}</span>}
      </div>
    </Modal>
  );
}
