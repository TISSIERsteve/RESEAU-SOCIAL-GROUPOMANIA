const app = require('./app');

// Fonction renvoi un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Si aucun port fourni on écoutera sur le 3000
const PORT = normalizePort(process.env.PORT || '3001', () => {
    console.log("Le serveur devrait démarrer sur le port 3001");
});

// Serveur écoute le port
app.listen(PORT, () => console.log(`Serveur en route sur le port : ${PORT} `))


