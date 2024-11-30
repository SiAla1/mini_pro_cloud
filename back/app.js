const express = require('express');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const cors = require('cors');
// const http=require('http');

const app = express();
// const server= http.createServer(app);
const clientRoutes = require('./routes/clientRoutes');

// Middleware pour gérer les CORS
app.use(
  cors({
    origin: ["http://localhost:3000"], // Autoriser les requêtes depuis cette origine
    credentials: true, // Permettre l'envoi de cookies ou d'en-têtes autorisés
  })
);

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json()); // IMPORTANT : Nécessaire pour traiter les requêtes POST et PUT

// Middleware pour les routes
app.use('/api', clientRoutes);

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
