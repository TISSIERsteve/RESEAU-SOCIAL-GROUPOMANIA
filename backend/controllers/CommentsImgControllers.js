const db = require("../config/mysql");

// Créer commentaire sur image Page accueil
exports.createCommentImg = (req, res, next) => {
    const { commentaires, compte, fk_id_post } = req.body;

    const messageimg = {
        content: commentaires,
        fk_id_user: compte,
        fk_id_post: fk_id_post
    };

    db.query("INSERT INTO comment set ? ", messageimg, (err, result) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Accès refusé pour commenter l'image" });
        } else {
            return res
                .status(200)
                .json({ message: "Message personnel sur image créer" });
        }
    });
};

// Récupérer commentaires image des utilisateurs page accueil
exports.getAllCommentsImg = (req, res, next) => {
    const id_message = req.params.id;

    db.query(
        `SELECT comment_id, content, user_id, prenom FROM comment JOIN user ON fk_id_user = user_id WHERE fk_id_post = ? ORDER BY content DESC`,
        [id_message],
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé du commentaire poster" });
            } else {
                return res.status(200).json({
                    result
                });
            }
        }
    );
};

// Récupérer commentaires image des utilisateurs  page perso
exports.getOneCommentImg = (req, res, next) => {
    db.query(
        `SELECT comment_id, content, user_id, prenom FROM comment JOIN user ON fk_id_user = user_id WHERE fk_id_post = ? ORDER BY content DESC`,
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé du commentaire poster" });
            } else {
                return res.status(200).json({
                    result
                });
            }
        }
    );
};
