import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Certificat() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
  });

  const [files, setFiles] = useState({
    extrait: null,
    parent_recto: null,
    parent_verso: null,
    recto_piece: null,
    verso_piece: null,
    acte_individuel: null,
  });

  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    setFiles((prev) => ({ ...prev, [name]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // champs texte
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // fichiers (IMPORTANT: nom inchangé)
    Object.entries(files).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch("http://localhost:3000/certificat", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const data = await res.json();
      console.log("SUCCESS:", data);

      alert("✅ Demande envoyée avec succès !");
      navigate("/certificat/" + data.id);
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  // styles
  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 15px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const imgStyle = {
    width: "100%",
    marginTop: "10px",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      <h1 style = {{ textAlign: "center",  backgroundColor: "orange", color: "#fff", padding: "10px" }}>📄 Demande de certificat</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="telephone"
          placeholder="Téléphone"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <h3 style={{ backgroundColor: "green", color: "#fff", padding: "10px" }}>Documents obligatoires</h3>
        <label>Extrait de moins d'un an du demandeur:</label>

        <input type="file" name="extrait" onChange={handleFileChange} required />
        {previews.extrait && <img src={previews.extrait} alt="aperçu" style={{width:"10%",marginBottom:"10px 0", textAlign:"center"}} />} <br /> <br /> <br />
        <h3 style={{ backgroundColor: "lightgray", color: "#333", padding: "10px" }}>Pièce nationale d'identité du parent (CNI mère ou père)</h3>
        <label>Recto:</label>
        <input type="file" name="parent_recto" onChange={handleFileChange} required />
        {previews.parent_recto && <img src={previews.parent_recto} alt="aperçu" style={{width:"10%",marginBottom:"10px 0", textAlign:"center"}} />} <br /> <br /><br />


        <label>Verso:</label>
        <input type="file" name="parent_verso" onChange={handleFileChange} required />
        {previews.parent_verso && <img src={previews.parent_verso} alt="aperçu" style={{width:"10%",marginBottom:"10px 0", textAlign:"center"}} />} <br /> <br /><br />


        <h3 style={{ backgroundColor: "#FFCC80", color: "#3E2723", padding: "10px" }}>Documents facultatifs</h3>
        <label>Recto pièce d'identité (CNI de l'intéressé) :</label>
        <input type="file" name="recto_piece" onChange={handleFileChange} />
        {previews.recto_piece && <img src={previews.recto_piece} alt="aperçu" style={{width:"10%",marginBottom:"10px 0", textAlign:"center"}} />} <br /> <br /> <br />
        <label>Verso pièce d'identité (CNI de l'intéressé) :</label>
        <input type="file" name="verso_piece" onChange={handleFileChange} />
        {previews.verso_piece && <img src={previews.verso_piece} alt="aperçu" style={{width:"10%",marginBottom:"10px 0", textAlign:"center"}} />} <br /> <br /> <br />
        <label>Acte individualité de l'interressé:</label>

        <input type="file" name="acte_individuel" onChange={handleFileChange} />
        {previews.acte_individuel && <img src={previews.acte_individuel} alt="aperçu" style={{width:"10%",marginBottom:"10px 0"}} />} <br /> <br /> <br />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "⏳ Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}