const express = require("express");
const router = express.Router();
const token = require("../middleware/AuthTokenMiddleware");

// ============================================ ROUTES ======================================================
const commentsCtrl = require("../controllers/CommentsImgControllers");

router.post("/", token, commentsCtrl.createCommentImg); // Créer un commentaire sur une image sur page accueil
router.get("/:id", token, commentsCtrl.getAllCommentsImg); // Obtenir un commentaire d'un utilisateur sur une image sur page accueil
router.get("/:id", token, commentsCtrl.getOneCommentImg); // Obtenir un commentaire d'un utilisateur sur une image sur page perso

module.exports = router;
