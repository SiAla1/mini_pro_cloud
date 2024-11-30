const express = require('express');
const db = require('../config/db');
const bodyParser = require('body-parser');
const clientController = require('../controllers/clientController');
// const db = require('../config/db');

const router = express.Router();

// Définir la route pour récupérer tous les clients avec leur région
router.get('/clients', clientController.getClients);
router.get('/regions',clientController.getRegions);
router.post('/clients', clientController.addClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);


  

module.exports = router;
