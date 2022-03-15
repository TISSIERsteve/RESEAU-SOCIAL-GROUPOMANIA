// Connection à MySql
const mysql = require("mysql");

// Fonction pour se connecter à PhpMyAdmin (base de données)
const database = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
console.log("Connecter à MySql");

database.connect();

module.exports = database;
