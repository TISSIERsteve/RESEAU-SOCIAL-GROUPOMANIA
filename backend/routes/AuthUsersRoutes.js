const express = require("express");
const router = express.Router();

// ============================================ ROUTES =================================================
const authCtrl = require("../controllers/AuthUsersControllers");
const token = require("../middleware/AuthTokenMiddleware");

router.post("/signup", authCtrl.signup); // Création utilisateur
router.post("/login", authCtrl.login); // Connexion utilisateur
router.delete("/:id", authCtrl.dessactive); // Effacer utilisateur
router.get("/loginIsAdmin/:id", token, authCtrl.loginIsAdmin); // Connexion administrateur

module.exports = router;
