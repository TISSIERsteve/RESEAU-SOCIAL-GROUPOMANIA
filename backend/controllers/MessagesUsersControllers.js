const db = require("../config/mysql");

// Obtenir tous les messages et images des utilisateurs sur Page accueil
exports.getAllMessages = (req, res, next) => {
    db.query(
        "SELECT message_perso_id,prenom,date,commentaire, fk_id_user FROM messageperso  ORDER BY date DESC ",
        (err, resultMessages) => {
            if (err) {
                return res.status(403).json({
                    message: "Accès refusé reception des messageperso(accueil)"
                });
            } else {
                db.query(
                    "SELECT post_id, title, fk_id_user, likes_id, dislikes_id, media_url, content, created_at AS date FROM post",
                    (err, resultPosts) => {
                        if (err) {
                            return res
                                .status(403)
                                .json({ message: "Accès refusé reception des posts image" });
                        } else {
                            const combined = resultMessages.concat(resultPosts);

                            combined.sort(
                                (message, post) => new Date(message.date) - new Date(post.date)
                            );

                            combined.reverse();

                            return res.status(200).json({
                                messageperso: {
                                    resultat: combined
                                }
                            });
                        }
                    }
                );
            }
        }
    );
};

// Obtenir tous mes messages et images personnels sur Page Perso
exports.getOneMessage = (req, res, next) => {
    const id = req.params.id;
    db.query(
        "SELECT message_perso_id,prenom,date,commentaire, fk_id_user, likes_id, dislikes_id FROM messageperso WHERE fk_id_user = ?  ORDER BY date DESC ",
        [id],
        (err, resultMessages) => {
            if (err) {
                return res.status(403).json({
                    message: "Accès refusé reception des messageperso(accueil)"
                });
            } else {
                db.query(
                    "SELECT post_id, title, fk_id_user, media_url, content, created_at AS date FROM post WHERE fk_id_user = ?",
                    [id],
                    (err, resultPosts) => {
                        if (err) {
                            return res
                                .status(403)
                                .json({ message: "Accès refusé reception des posts image" });
                        } else {
                            const combined = resultMessages.concat(resultPosts);

                            combined.sort(
                                (message, post) => new Date(message.date) - new Date(post.date)
                            );

                            combined.reverse();

                            return res.status(200).json({
                                messageperso: {
                                    resultat: combined
                                }
                            });
                        }
                    }
                );
            }
        }
    );
};

// Créer un message sur Page accueil
exports.createMessage = (req, res, next) => {
    const prenom = req.body.prenom;
    const commentaire = req.body.commentaire;
    const id = req.body.id;

    const messageperso = {
        prenom,
        commentaire,
        fk_id_user: id,
        likes_id: JSON.stringify([]),
        dislikes_id: JSON.stringify([])
    };

    db.query("INSERT INTO messageperso set ?", messageperso, (err, result) => {
        if (err) {
            return res.status(403).json({ message: "Accès refusé" });
        } else {
            return res.status(200).json({ message: "Message créer" });
        }
    });
};

// Effacer mes messages perso sur Page perso
exports.deleteMessage = (req, res, next) => {
    const persoId = req.params.id;

    db.query(
        "DELETE FROM messageperso WHERE message_perso_id = ?",
        [persoId],
        (err, result) => {
            if (err) {
                return res.status(403).json({ message: "Accés refusé" });
            } else {
                return res.status(200).json({ message: "Message supprimer" });
                result;
            }
        }
    );
};

// Modifier message perso sur page perso
exports.updateMessage = (req, res, next) => {
    const id = req.params.id;
    const commentaire = req.body.commentaire;

    db.query(
        `UPDATE messageperso SET commentaire = ? WHERE fk_id_user = ${id}`,
        [commentaire],
        (err, result) => {
            if (err) {
                return res.status(403).json({ message: "Accés refusé" });
            } else {
                return res.status(200).json({ message: "Message modifié" });
            }
        }
    );
};

// Like message
exports.likeMessage = async (req, res) => {
    const message_perso_id = req.params.id;
    const userId = req.body.userId;

    if (!userId || !message_perso_id) {
        return res.status(400).json({ message: "Les champs sont manquants" });
    }

    db.query(
        "SELECT * FROM messageperso WHERE message_perso_id=?",
        [message_perso_id],
        (err, result) => {
            if (err) {
                throw err;
            } else {
                const userLikes = result[0].likes_id.length
                    ? JSON.parse(result[0].likes_id)
                    : [];

                if (!userLikes.includes(userId)) {
                    userLikes.push(userId);
                } else {
                    userLikes.splice(userLikes.indexOf(userId), 1);
                }

                const post = {
                    likes_id: JSON.stringify(userLikes)
                };

                db.query(
                    `UPDATE messageperso SET likes_id = ? WHERE message_perso_id = ?`,
                    [post.likes_id, message_perso_id],
                    (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            return res.status(200).json({ message: "Post modifié" });
                        }
                    }
                );
            }
        }
    );
};

// Obtenir les likes sur les messages
exports.getAllLikeMessage = (req, res) => {
    const id_like = req.params.id;

    db.query(
        `SELECT  message_perso_id ,likes_id FROM messageperso JOIN user ON fk_id_user = user_id WHERE fk_id_user`,
        [id_like],
        (err, result) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Accès refusé du like sur image" });
            } else {
                return res.status(200).json({
                    result
                });
            }
        }
    );
};
