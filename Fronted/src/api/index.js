import api from "./axiosInstance";

// â”€â”€ Auth â”€â”€
export const loginApi = (data) => api.post("/api/auth/login", data);
export const registerApi = (data) => api.post("/api/auth/register", data);

// â”€â”€ Skills â”€â”€
export const getSkillsApi = () => api.get("/api/skills");
export const addSkillApi = (data) => api.post("/api/skills", data);

// â”€â”€ Requests â”€â”€
export const getRequestsApi = () => api.get("/api/skill-requests");
export const sendRequestApi = (data) => api.post("/api/skill-requests", data);
export const acceptRequestApi = (id) => api.put(`/api/skill-requests/${id}/accept`);
export const declineRequestApi = (id) => api.put(`/api/skill-requests/${id}/decline`);

// â”€â”€ Bookings â”€â”€
export const getBookingsApi = () => api.get("/api/bookings");
export const completeBookingApi = (id) => api.put(`/api/bookings/${id}/complete`);
export const releaseEscrowApi = (id) => api.put(`/api/bookings/${id}/release-escrow`);

// â”€â”€ Wallet â”€â”€
export const getWalletApi = () => api.get("/api/wallet");
export const topUpWalletApi = (data) => api.post("/api/wallet/topup", data);
export const withdrawWalletApi = (data) => api.post("/api/wallet/withdraw", data);

// â”€â”€ Transactions â”€â”€
export const getTransactionsApi = () => api.get("/api/transactions");

// â”€â”€ Profile â”€â”€
export const getProfileApi = () => api.get("/api/profile");
export const updateProfileApi = (data) => api.put("/api/profile", data);

// â”€â”€ Dashboard â”€â”€
export const getDashboardApi = () => api.get("/api/dashboard");
