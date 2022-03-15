const express = require("express");
const router = express.Router();
const token = require("../middleware/AuthTokenMiddleware");

// ============================================ ROUTES ======================================================
const commentsCtrl = require("../controllers/CommentsUsersControllers");

router.get("/", token, commentsCtrl.getAllComments); // Obtenir un commentaire d'un utilisateur sur un message sur page accueil
router.get("/:id", token, commentsCtrl.getOneComment); // Obtenir les commentaires d'un utilisateur sur un message perso sur page perso
router.post("/", token, commentsCtrl.createComment); // Créer un commentaire sur un message sur page accueil
router.delete("/:id", token, commentsCtrl.deleteComment); // Effacer un commentaire
router.put("/:id", token, commentsCtrl.updateComment); // Modifier mes commentaires perso sur page accueil

module.exports = router;
