import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider }   from "@/context/AppContext";
import AppLayout         from "@/components/layout/AppLayout";
import ProtectedRoute    from "@/components/layout/ProtectedRoute";
import ToastContainer    from "@/components/common/ToastContainer";
import LoadingOverlay    from "@/components/common/LoadingOverlay";
import Landing          from "@/pages/Landing";
import Dashboard    from "@/pages/Dashboard";
import Skills       from "@/pages/Skills";
import Requests     from "@/pages/Requests";
import Bookings     from "@/pages/Bookings";
import Wallet       from "@/pages/Wallet";
import Transactions from "@/pages/Transactions";
import Profile      from "@/pages/Profile";
import Auth         from "@/pages/Auth";

// Flatten nested routes approach
export default function App() {
  return (
    <AppProvider>
      <LoadingOverlay />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index            element={<Dashboard    />} />
          <Route path="skills"       element={<Skills       />} />
          <Route path="requests"     element={<Requests     />} />
          <Route path="bookings"     element={<Bookings     />} />
          <Route path="wallet"       element={<Wallet       />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile"      element={<Profile      />} />
          <Route path="*"            element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}
