const db = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Création compte utilisateur
exports.signup = (req, res, next) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            throw err;
        }
        const user = {
            nom,
            prenom,
            password: hash,
            email
        };

        db.query("INSERT INTO user set ?", user, (err, result) => {
            if (err) {
                res
                    .status(403)
                    .json({ message: "Accès refusé pour la création du compte" });
            } else {
                res.status(200).json({ message: "Utilisateur créer" });
            }
        });
    });
};

// Connexion au compte utilisateur
exports.login = (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;

    db.query(
        `SELECT * FROM user WHERE email = ?`,
        [email],
        async (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé pour la connexion au compte" });
            }
            if (result.length) {
                const passwordOk = await bcrypt.compare(password, result[0].password);

                if (passwordOk === false || email === false) {
                    return res
                        .status(403)
                        .json({ message: "Mot de passe non valide ou non renseigner" });
                }

                if (passwordOk) {
                    const token = jwt.sign(
                        {
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                            id: result[0].user_id
                        },
                        process.env.JWT_SECRET
                    );

                    return res.status(200).json({
                        message: "Connecté",
                        token,
                        user: {
                            id: result[0].user_id,
                            email: result[0].email,
                            prenom: result[0].prenom
                        }
                    });
                }
            } else {
                return res
                    .status(404)
                    .json({ message: "Erreur serveur sur la connexion au compte" });
            }
        }
    );
};

// Désactiver compte utilisateur
exports.dessactive = (req, res, next) => {
    const id = req.params.id;

    db.query("DELETE FROM user WHERE user_id = ?", [id], (err, result) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Accés refusé pour supprimer compte" });
        } else {
            return res.status(200).json({ message: "Utilisateur supprimer" });
        }
    });
};

// Connexion en tant administrateur
exports.loginIsAdmin = (req, res, next) => {
    const { id } = req.params;

    db.query(
        `SELECT isAdmin FROM user WHERE user_id = ?`,
        [id],
        (err, result) => {
            if (err) {
                return res.status(403).json({
                    message: "Accès refusé à la connexion en tant Administrateur"
                });
            } else {
                return res.status(200).json({ isAdmin: result[0].isAdmin });
            }
        }
    );
};
