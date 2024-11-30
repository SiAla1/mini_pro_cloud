// src/App.js
import React from 'react';
import './App.css';
import ClientTable from './components/ClientTable'; // Importer le composant ClientTable

function App() {
  return (
    <div className="App">
      <h1>Liste des Clients</h1>
      <ClientTable /> {/* Utiliser le composant ClientTable */}
    </div>
  );
}

export default App;
