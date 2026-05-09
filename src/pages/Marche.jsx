

export default function Welcome() {
  return (
    <div style={styles.container}>
      <h1 style={{...styles.title, color: "green", textAlign: "center"}}>Bienvenue sur notre marché de vente d’ordinateurs portable!</h1>
      <p style={styles.text}>
        Bienvenue sur <strong>GestionPro</strong>, votre destination de confiance pour l’achat d’ordinateurs de qualité, adaptés à tous vos besoins : travail, études ou loisirs. Ici, nous mettons à votre disposition une large gamme d’ordinateurs portables et de bureau, soigneusement sélectionnés pour leur performance, leur fiabilité et leur design moderne.
      </p>
      <h2 style={styles.subtitle}>Pourquoi choisir notre marché ?</h2>
      <ul style={styles.list}>
        <li><strong>Produits garantis :</strong> Tous nos ordinateurs sont accompagnés d’une garantie fiable, vous assurant tranquillité d’esprit et sécurité après votre achat.</li>
        <li><strong>Qualité et performance :</strong> Nos modèles sont testés et choisis pour vous offrir rapidité, durabilité et efficacité au quotidien.</li>
        <li><strong>Service client dédié :</strong> Notre équipe est toujours prête à vous conseiller et vous accompagner dans le choix de l’ordinateur idéal pour vos besoins.</li>
        <li><strong>Offres avantageuses :</strong> Profitez de promotions régulières et d’un excellent rapport qualité-prix.</li>
      </ul>
      <p style={styles.text}>
        Nous croyons que <strong>l’achat d’un ordinateur doit être simple, sûr et satisfaisant</strong>. Explorez notre marché et découvrez la technologie qui vous permettra de travailler, créer et jouer en toute sérénité.
      </p>
      <p style={styles.footer}><strong>GestionPro – Votre confiance, notre priorité.</strong></p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    color: "#333",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginTop: "20px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "15px",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "15px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "1rem",
  },
};
