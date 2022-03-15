const express = require("express");
const router = express.Router();
const token = require("../middleware/AuthTokenMiddleware");

// ============================================ ROUTES ======================================================
const messagesCtrl = require("../controllers/MessagesUsersControllers");

router.post("/", token, messagesCtrl.createMessage); // Créer un message sur page accueil
router.get("/", token, messagesCtrl.getAllMessages); // Obtenir tous les messages et imagesdes utilisateurs sur page accueil
router.get("/:id", token, messagesCtrl.getOneMessage); // Obtenir mes messages personnels sur page perso
router.delete("/:id", token, messagesCtrl.deleteMessage); // Effacer un message sur page perso
router.put("/:id", token, messagesCtrl.updateMessage); // Modifier message perso sur page perso

router.put("/:id/likeMessage", token, messagesCtrl.likeMessage); // Like message
router.get("/:id/likes", token, messagesCtrl.getAllLikeMessage); // Obtenir les likes sur les messages

module.exports = router;
