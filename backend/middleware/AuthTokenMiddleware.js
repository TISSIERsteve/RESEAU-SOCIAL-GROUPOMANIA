const db = require("../config/mysql");
const jwt = require("jsonwebtoken"); // Je vérifie les token

// Vérification du token s'il correspond
module.exports = async (req, res, next) => {
    try {
        // Si pas de token
        const token = req.headers.authorization.split(" ")[0];
        if (!token) {
            return res.status(401).json({
                success: false,
                result: null,
                message: "Utilisateur non authentifié pas de token"
            });
        }

        // Si token correspond pas
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const isAdmin = decodeToken.isAdmin; // Administarteur
        req.auth = { isAdmin }; // Administrateur
        if (!decodeToken) {
            return res.status(401).json({
                success: false,
                result: null,
                message: "Utilisateur non authentifié token correspond pas"
            });
        }

        db.query(
            "SELECT * FROM user WHERE user_id=?",
            [decodeToken.id],
            (err, result) => {
                if (err) {
                    throw err;
                }
                if (result.length) {
                    next();
                } else {
                    return res.status(401).json({
                        success: false,
                        result: null,
                        message: "Utilisateur non authentifié "
                    });
                }
            }
        );

        // Problème si autre erreur serveur
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
