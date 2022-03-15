const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const token = require("../middleware/AuthTokenMiddleware");

// ============================================ ROUTES ======================================================
const postsCtrl = require("../controllers/PostsUsersControllers");

router.post("/", token, multer, postsCtrl.createPost); // Créer une image sur page accueil
router.delete("/:id", token, postsCtrl.deletePost); // Effacer une image sur page perso
router.put("/:id", token, multer, postsCtrl.updateCommentImg); // Modifier image perso sur page perso

router.put("/:id/likeImg", token, postsCtrl.likeImg); // Like image
router.get("/:id", token, postsCtrl.getAllLike); // Obtenir les likes sur les images

module.exports = router;
