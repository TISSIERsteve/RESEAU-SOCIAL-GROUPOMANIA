const db = require("../config/mysql");

// Récupérer tous les commentaires message page accueil
exports.getAllComments = (req, res, next) => {
    db.query(
        `SELECT content, comment_id,user_id, prenom FROM comment JOIN User ON fk_id_user = user_id WHERE fk_id_message ORDER BY content DESC`,
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé du commentaire poster (perso)" });
            } else {
                return res.status(200).json({
                    result
                });
            }
        }
    );
};

// Récupérer mes commentaires message  page perso
exports.getOneComment = (req, res, next) => {
    const id_message = req.params.id;

    db.query(
        `SELECT comment_id, content, user_id, prenom FROM comment JOIN user ON fk_id_user = user_id WHERE fk_id_message=? ORDER BY comment_id DESC`,
        [id_message],
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé du commentaire poster (accueil)" });
            } else {
                return res.status(200).json({
                    result
                });
            }
        }
    );
};

// Créer un commentaire sur un message sur Page accueil
exports.createComment = (req, res, next) => {
    const { commentaires, compte, id_post } = req.body;

    const messageperso = {
        content: commentaires,
        fk_id_user: compte,
        fk_id_message: id_post
    };

    db.query("INSERT INTO comment set ?", messageperso, (err, result) => {
        if (err) {
            return res.status(403).json({ message: "Accès refusé" });
        } else {
            return res.status(200).json({ message: "Message personnel créer" });
        }
    });
};

// Effacer un commentaire sur page accueil
exports.deleteComment = (req, res, next) => {
    db.query(
        "DELETE FROM comment WHERE comment_id=?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(403).json({ message: "Une erreur est survenue" });
            } else {
                return res
                    .status(200)
                    .json({ message: "Votre commentaire à bien été supprimer" });
            }
        }
    );
};

// Modifier un commentaire perso sur page accueil
exports.updateComment = (req, res, next) => {
    const id = req.params.id;
    const commentaire = req.body.commentaire;

    db.query(
        `UPDATE comment SET content = ? WHERE comment_id = ${id}`,
        [commentaire],
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accés refusé pour la modification de l'image" });
            } else {
                return res.status(200).json({ message: "Message modifié" });
            }
        }
    );
};
