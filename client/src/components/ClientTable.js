import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // État pour gérer le formulaire d'ajout
  const [clientToEdit, setClientToEdit] = useState(null);
  const [newClient, setNewClient] = useState({ nom: '', prenom: '', age: '', region: '' }); // État pour le nouveau client

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await axios.get('http://localhost:5000/api/clients');
        setClients(clientResponse.data);

        const regionResponse = await axios.get('http://localhost:5000/api/regions');
        setRegions(regionResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSubmit = async () => {
    try {
      const { nom, prenom, age, region } = newClient;
      const response = await axios.post('http://localhost:5000/api/clients', {
        nom,
        prenom,
        age,
        ID_region: region,
      });
      setClients([...clients, response.data]); // Ajouter le nouveau client à la liste
      setIsAdding(false); // Masquer le formulaire
      setNewClient({ nom: '', prenom: '', age: '', region: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client:', error);
    }
  };

  const handleEditSubmit = async () => {
    const { ID_client, nom, prenom, age, region } = clientToEdit;
    try {
      await axios.put(`http://localhost:5000/api/clients/${ID_client}`, {
        nom,
        prenom,
        age,
        ID_region: region,
      });
      setClients(clients.map(client => client.ID_client === ID_client ? clientToEdit : client));
      setIsEditing(false);
      setClientToEdit(null);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      setClients(clients.filter(client => client.ID_client !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const editClient = (client) => {
    const regionId = regions.find(region => region.libelle === client.region)?.ID_region || null;
    setIsEditing(true);
    setClientToEdit({ ...client, region: regionId });
  };

  return (
    <div>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div>
          <button className="button-classic" onClick={() => setIsAdding(true)}>+ Ajouter</button>
          {isAdding && (
            <div>
              <h3>Ajouter un nouveau client</h3>
              <form onSubmit={() => { handleAddSubmit();  }}>
                <input
                  type="text"
                  value={newClient.nom}
                  onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
                  placeholder="Nom"
                  required
                />
                <input
                  type="text"
                  value={newClient.prenom}
                  onChange={(e) => setNewClient({ ...newClient, prenom: e.target.value })}
                  placeholder="Prénom"
                  required
                />
                <input
                  type="number"
                  value={newClient.age}
                  onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                  placeholder="Âge"
                  required
                />
                <select
                  value={newClient.region}
                  onChange={(e) => setNewClient({ ...newClient, region: e.target.value })}
                  required
                >
                  <option value="">Sélectionnez une région</option>
                  {regions.map(region => (
                    <option key={region.ID_region} value={region.ID_region}>
                      {region.libelle}
                    </option>
                  ))}
                </select>
                <button type="submit">Ajouter</button>
                <button onClick={() => setIsAdding(false)}>Annuler</button>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>ID Client</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Âge</th>
                <th>Région</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.ID_client}>
                  <td>{client.ID_client}</td>
                  <td>{client.nom}</td>
                  <td>{client.prenom}</td>
                  <td>{client.age}</td>
                  <td>{client.region}</td>
                  <td>
                    <button className="button-border"onClick={() => editClient(client)}>Modifier</button>
                    <button className="button-shadow" onClick={() => deleteClient(client.ID_client)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          

          {isEditing && (
            <div>
              <h3>Modifier le client</h3>
              <form onSubmit={() => {  handleEditSubmit(); }}>
                <input
                  type="text"
                  value={clientToEdit.nom}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, nom: e.target.value })}
                  placeholder="Nom"
                  required
                />
                <input
                  type="text"
                  value={clientToEdit.prenom}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, prenom: e.target.value })}
                  placeholder="Prénom"
                  required
                />
                <input
                  type="number"
                  value={clientToEdit.age}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, age: e.target.value })}
                  placeholder="Âge"
                  required
                />
                <select
                  value={clientToEdit.region}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, region: e.target.value })}
                  required
                >
                  {regions.map(region => (
                    <option key={region.ID_region} value={region.ID_region}>
                      {region.libelle}
                    </option>
                  ))}
                </select>
                <button type="submit">Sauvegarder</button>
                <button onClick={() => { setIsEditing(false); setClientToEdit(null); }}>Annuler</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientTable;
