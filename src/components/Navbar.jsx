import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#333",
      color: "white"
    }}>

      {/* Logo cliquable */}
      <Link to="/">
        <img 
          src={logo} 
          alt="Académie Pro Logo" 
          style={{
            height: "70px",
            cursor: "pointer"
          }}
        />
      </Link>

      {/* Menu */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Accueil</Link>
        <Link to="/documents" style={linkStyle}>Documents</Link>
        <Link to="/chat" style={linkStyle}>Chat</Link>
        <Link to="/login" style={linkStyle}>Se connecter</Link>
        <Link to="/register" style={linkStyle}>S'inscrire</Link>
        <Link to="/marche" style={linkStyle}>Marché pc</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none"
};