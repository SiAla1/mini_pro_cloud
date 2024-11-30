const odbc = require('odbc');
require('dotenv').config();

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    const connectionString = process.env.ODBC_CONNECTION_STRING || 
      'Driver={ODBC Driver 18 for SQL Server};Server=tcp:societeserveur.database.windows.net,1433;Database=societe;Uid=Sqladmin;Pwd=Ala12345;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30';

    try {
      this.connection = await odbc.connect(connectionString);
      console.log('Connexion ODBC réussie');
      return this.connection;
    } catch (err) {
      console.error('Erreur de connexion ODBC :', err);
      throw err;
    }
  }

  async query(sql, params = []) {
    if (!this.connection) {
      await this.connect();
    }

    try {
      const result = await this.connection.query(sql, params);
      return result;
    } catch (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      throw err;
    }
  }

  async close() {
    if (this.connection) {
      try {
        await this.connection.close();
        console.log('Connexion ODBC fermée');
      } catch (err) {
        console.error('Erreur lors de la fermeture de la connexion :', err);
      }
    }
  }
}

// Créer et exporter une instance unique
const db = new Database();

module.exports = db;
