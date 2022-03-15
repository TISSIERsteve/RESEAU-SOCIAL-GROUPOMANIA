const app = require('./app');

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

const PORT = normalizePort(process.env.PORT || '3001', () => {
    console.log("Le serveur devrait démarrer sur le port 3001");
});

app.listen(PORT, () => console.log(`Serveur en route sur le port : ${PORT} `))


