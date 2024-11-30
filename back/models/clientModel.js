const db = require('../config/db');

const getClientsWithRegion = async () => {
  const query = `
    SELECT client.ID_client, client.nom, client.prenom, client.age, region.libelle AS region
    FROM client
    JOIN region ON client.ID_region = region.ID_region;
  `;
  try {
    // Utilisez simplement db.query()
    const results = await db.query(query);
    return results;
  } catch (err) {
    console.error('Erreur lors de la récupération des clients :', err);
    throw new Error('Impossible de récupérer les clients');
  }
};

const getRegions = async () => {
  const query = "SELECT * FROM region";
  try {
    const results = await db.query(query);
    return results;
  } catch (err) {
    console.error('Erreur lors de la récupération des régions :', err);
    throw new Error('Impossible de récupérer les régions');
  }
};

// Exemple de méthode avec paramètres
const addClient = async (clientData) => {
  const query = `
    INSERT INTO client (nom, prenom, age, ID_region) 
    VALUES (?, ?, ?, ?)
  `;
  try {
    const result = await db.query(query, [
      clientData.nom, 
      clientData.prenom, 
      clientData.age, 
      clientData.ID_region
    ]);
    return result;
  } catch (err) {
    console.error('Erreur lors de l\'ajout du client :', err);
    throw new Error('Impossible d\'ajouter le client');
  }
};

const updateClient = async (clientData, id) => {
  const query = `
    UPDATE client 
    SET nom = ?, prenom = ?, age = ?, ID_region = ? 
    WHERE ID_client = ?
  `;
  try {
    const result = await db.query(query, [
      clientData.nom, 
      clientData.prenom, 
      clientData.age, 
      clientData.ID_region, 
      id
    ]);
    return result;
  } catch (err) {
    console.error('Erreur lors de la mise à jour du client :', err);
    throw new Error('Impossible de mettre à jour le client');
  }
};


const deleteClient = async (id) => {
  const query = `DELETE FROM client WHERE ID_client = ?`;
  try {
    const result = await db.query(query, [id]);
    return result;
  } catch (err) {
    console.error('Erreur lors de la suppression du client :', err);
    throw new Error('Impossible de supprimer le client');
  }
};


module.exports = {
  getClientsWithRegion,
  getRegions,
  addClient,
  updateClient,
  deleteClient
};