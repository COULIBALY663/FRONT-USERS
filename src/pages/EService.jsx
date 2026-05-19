import { useNavigate } from "react-router-dom";
export default function EService() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ justifyContent: "center", textAlign: "center", fontSize: "80px" }}>🖥️ Service en ligne</h1>
      <p style={{ textAlign: "center", backgroundColor: "#A8D5BA", padding: "10px", color : "#1B4332", fontSize: "30px" }}>Choisissez un service </p>
 
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        
        <button 
          onClick={() => navigate("/Certificat")}
          style={btn}
        >
          📄 Demande de certificat
        </button>

        <button 
          onClick={() => navigate("/Casier")}
          style={btn}
        >
          📑 Demande de casier judiciaire
        </button>
        <button 
          onClick={() => navigate("/Timbre")}
          style={btn}
        >
          📄 Demande de timbre
        </button>
        

      </div>
    </div>
  );
}

const btn = {
  padding: "15px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};