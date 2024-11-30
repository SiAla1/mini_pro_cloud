const express = require('express');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const cors = require('cors');
const path = require('path'); // Importer path pour gérer les chemins de fichiers

const app = express();
const clientRoutes = require('./routes/clientRoutes');

// Middleware pour gérer les CORS
app.use(
  cors({
    origin: '*', // Autoriser les requêtes depuis toutes les origines
    credentials: true, // Permettre l'envoi de cookies ou d'en-têtes autorisés
  })
);

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json()); // IMPORTANT : Nécessaire pour traiter les requêtes POST et PUT

// Middleware pour les routes API
app.use('/api', clientRoutes);

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'public')));

// For any route that isn't API, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware pour logger les requêtes reçues
app.use((req, res, next) => {
  console.log('Requête reçue:', req.method, req.url);
  console.log('Corps de la requête:', req.body);
  next();
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000; // Défaut au port 5000 si non défini dans .env
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
