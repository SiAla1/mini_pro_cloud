const clientModel = require('../models/clientModel');


// Fonction pour gérer la récupération des clients avec leur région
const getClients = async (req, res) => {
  try {
    const clients = await clientModel.getClientsWithRegion();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const getRegions = async (req, res) =>{
  try {
    const clients = await clientModel.getRegions();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


const addClient = async (req, res) => {
  try {
    const clientData = req.body; // Récupère les données depuis le corps de la requête

    // Vérifiez que toutes les propriétés requises sont présentes
    if (!clientData.nom || !clientData.prenom || !clientData.age || !clientData.ID_region) {
      return res.status(400).json({ error: 'Tous les champs (nom, prenom, age, ID_region) sont requis.' });
    }

    const result = await clientModel.addClient(clientData); // Passe les données au modèle
    res.status(201).json({ message: 'Client ajouté avec succès', result });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du client :', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const clientData = req.body;

    // Vérifiez que toutes les propriétés requises sont présentes
    if (!clientData.nom || !clientData.prenom || !clientData.age || !clientData.ID_region) {
      return res.status(400).json({ error: 'Tous les champs (nom, prenom, age, ID_region) sont requis.' });
    }

    const result = await clientModel.updateClient(clientData, id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    res.status(200).json({ message: 'Client modifié avec succès' });
  } catch (error) {
    console.error('Erreur lors de la modification du client :', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;

    // Vérifiez que l'ID est valide
    if (!id) {
      return res.status(400).json({ error: 'Un ID valide est requis.' });
    }

    const result = await clientModel.deleteClient(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    res.status(200).json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du client :', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};



module.exports = {
  getClients,
  getRegions,
  addClient,
  updateClient,
  deleteClient
};
