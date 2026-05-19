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

  const [loading, setLoading] = useState(false);

  // ======================
  // HANDLE INPUT TEXT
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // HANDLE FILES
  // ======================
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  // ======================
  // SUBMIT FORM
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // champs texte
      formData.append("nom", form.nom);
      formData.append("prenom", form.prenom);
      formData.append("telephone", form.telephone);

      // fichiers
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      // ======================
      // API CREATE CERTIFICAT
      // ======================
      const res = await fetch("http://localhost:3000/certificat", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erreur création certificat");
      }

      const data = await res.json();

      console.log("CERTIFICAT CREATED:", data);

      // ======================
      // REDIRECTION PAGE PAIEMENT
      // ======================
      navigate(`/certificat/${data.id}`);

    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'envoi du dossier");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STYLES
  // ======================
  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", background: "orange", color: "#fff", padding: "10px" }}>
        📄 Demande de certificat
      </h2>

      <form onSubmit={handleSubmit}>
        {/* TEXT FIELDS */}
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

        {/* FILES */}
        <h3>📎 Documents obligatoires</h3>

        <label>Extrait de naissance</label>
        <input type="file" name="extrait" onChange={handleFileChange} required />

        <label>Parent Recto</label>
        <input type="file" name="parent_recto" onChange={handleFileChange} required />

        <label>Parent Verso</label>
        <input type="file" name="parent_verso" onChange={handleFileChange} required />

        <h3>📎 Documents facultatifs</h3>

        <label>Recto pièce</label>
        <input type="file" name="recto_piece" onChange={handleFileChange} />

        <label>Verso pièce</label>
        <input type="file" name="verso_piece" onChange={handleFileChange} />

        <label>Acte individuel</label>
        <input type="file" name="acte_individuel" onChange={handleFileChange} />

        <br /><br />

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "⏳ Envoi..." : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
}