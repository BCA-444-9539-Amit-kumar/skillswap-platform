import { useState } from "react";
import Avatar  from "@/components/ui/Avatar";
import Badge   from "@/components/ui/Badge";
import Button  from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { DEMO_REQUESTS } from "@/data/demoData";
import { acceptRequestApi, declineRequestApi } from "@/api";

export default function Requests() {
  const { addToast, safeCall } = useApp();
  const [requests, setRequests] = useState(DEMO_REQUESTS);

  const handleAction = (id, action) => {
    const apiFn = action === "accepted" ? acceptRequestApi : declineRequestApi;
    safeCall(() => apiFn(id), () => {
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
      addToast(action === "accepted" ? "Request accepted! Booking created." : "Request declined.", action === "accepted" ? "success" : "error");
    });
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:18 }}>Skill Requests</div>
        <div style={{ display:"flex", gap:8 }}>
          <Badge variant="amber">3 Pending</Badge>
          <Badge variant="green">8 Accepted</Badge>
          <Badge variant="gray">2 Expired</Badge>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Requester</th><th>Skill Requested</th><th>Message</th><th>Sent</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Avatar initials={r.avatar} gradient={r.gradient} size={28} fontSize={11} />
                      <div>
                        <div style={{ fontSize:14, fontWeight:500 }}>{r.name}</div>
                        <div style={{ fontSize:11, color:"var(--color-text3)" }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize:14, fontWeight:500 }}>{r.skill}</div>
                    <div style={{ fontSize:11, color:"var(--color-text3)" }}>₹{r.rate}/hr</div>
                  </td>
                  <td style={{ maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:14, color:"var(--color-text2)" }}>"{r.message}"</td>
                  <td style={{ fontSize:11, color:"var(--color-text3)" }}>{r.date}</td>
                  <td>
                    <Badge variant={r.status==="accepted"?"green":r.status==="declined"?"red":"amber"}>
                      <span className="dot" />{r.status.charAt(0).toUpperCase()+r.status.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    {r.status === "pending" ? (
                      <div style={{ display:"flex", gap:8 }}>
                        <Button variant="success" size="sm" onClick={() => handleAction(r.id,"accepted")}>Accept</Button>
                        <Button variant="danger"  size="sm" onClick={() => handleAction(r.id,"declined")}>Decline</Button>
                      </div>
                    ) : <span style={{ fontSize:12, color:"var(--color-text3)" }}>{r.status==="accepted"?"Booking created":"Declined"}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
