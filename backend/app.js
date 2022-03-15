const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

app.use(express.urlencoded({ extended: true })); //Middleware permet de passer des requêtes au niveau du body

app.use(cors());
app.use(express.json());

// ======================================== Déclaration de mes fonctions ===========================================
const authRoutes = require("./routes/AuthUsersRoutes");
const messagesRoutes = require("./routes/MessagesUserRoutes");
const commentsRoutes = require("./routes/CommentsUsersRoutes");
const postsRoutes = require("./routes/PostsUsersRoutes");
const commentsRoutesImg = require("./routes/CommentsImgRoutes");

// ==================================== Enregistrer mes routes avec chemins =====================================
// Utilisateur
app.use("/api/auth", authRoutes); // Route création et connexion utilisateurs

// Messages
app.use("/api/messagesPerso", messagesRoutes); // Route publication message perso
app.use("/api/comments", commentsRoutes); // Route publication commentaires sur message perso utilisateurs

// Images
app.use("/api/posts", postsRoutes); // Route publication images perso
app.use("/api/contentImg", commentsRoutesImg); // Route publication commentaires sur une image utilisateurs

// Middleware qui permet de charger les fichiers qui sont dans le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
