import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// Components
import PostComment from "../CardPostOneComment/CardPostOneComment";
import GetComment from "../CardGetAllComment/CardGetAllComment";
import ImageOneComment from "../CardCommentOneImage/CardCommentOneImage";
import CardLikeImage from "../CardLike/CardLikeImage";
import CardGetAllCommentImage from "../CardGetAllCommentImage/CardGetAllCommentImage";
import CardModifyCommentAdmin from "../ModifyCommentAdmin/ModifyCommentAdmin";
import CardModifyImgAdmin from "../CardModifyImgAdmin/CardModifyImgAdmin";

// CSS
import "./CardPrincipal.css";
import CardLikeMessage from "../CardLike/CardLikeMessage";

// ===== Components Card Page principal accueil =====
function CardPrincipal({ isAdmin }) {

    const navigate = useNavigate();

    // Affichage de tous les messages et images postés
    const [post, setpost] = useState("");
    useEffect(
        () => {
            Axios.get("http://localhost:3001/api/messagesPerso")
                .then(response => {
                    setpost(response.data.messageperso.resultat);
                })
                .catch(err => {
                    if (err.response.data.message === "jwt expired") {
                        alert("Votre session est expiré veuillez vous reconnecter");
                        localStorage.clear();

                        navigate("/AccountScreen", { replace: true });
                    }
                });
        },
        [navigate]
    );
    // ======

    // Fonction admin supprimer card img
    const deleteCardImg = e => {
        if (
            window.confirm(
                "En tant qu'administrateur voulez vous vraiment supprimer cette image ?"
            )
        ) {
            deleteCardImgDefini(e);
        }
    };
    const deleteCardImgDefini = id => {
        Axios.delete("http://localhost:3001/api/posts/" + id)
            .then(response => {
                alert("En tant qu'administarteur vous avez bien supprimer l'image.");
                window.location.reload();
            });
    };
    // ======

    // Fonction admin supprimer card message
    const deleteCardMessage = e => {
        if (
            window.confirm(
                "En tant qu'administrateur voulez vous vraiment supprimer ce message ?"
            )
        ) {
            deleteCardMessageDefini(e);
        }
    };
    const deleteCardMessageDefini = id => {
        Axios.delete(
            "http://localhost:3001/api/messagesPerso/" + id
        ).then(response => {
            alert("En tant qu'administrateur vous avez bien supprimer le message.");
            window.location.reload();
        });
    };
    // ======

    // JSX
    return (
        <div>
            <section className="items">
                {post && post.length
                    ? post.map(x => {
                        if (x.message_perso_id) {
                            const date = new Date(x.date);

                            return (
                                <li key={x.message_perso_id}>
                                    {/* Partie message */}
                                    <article className="card">
                                        <img
                                            className="profileCommentImage"
                                            src="./images/img1.png"
                                            alt="enseigne"
                                        />
                                        <h2 className="profileName">
                                            {x.prenom} à publier
                                            <br />
                                            {`Le ${date.getDate()} ${date.getMonth() +
                                                1} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}
                                        </h2>
                                        <p className="profileComment">
                                            {" "}{x.commentaire}{" "}
                                        </p>

                                        <div className="profileComments">
                                            {/* Components pour like */}
                                            <CardLikeMessage idLikeMessage={x.message_perso_id} />

                                            {/* Components poster un commentaire sur un message page accueil */}
                                            <PostComment idPost={x.message_perso_id} />
                                        </div>

                                        {/* Components voir commentaire sur un message page accueil */}
                                        <GetComment isAdmin={isAdmin} messageid={x.message_perso_id} />

                                        {/* { Fonction administrateur */}
                                        {isAdmin !== 1 ||
                                            <>
                                                <div className="admin_img_card">

                                                    <button
                                                        aria-label="effacer"
                                                        onClick={() => deleteCardMessage(x.message_perso_id)}>
                                                        <i className="fas fa-trash-alt poubelle admin_poubelle" />
                                                    </button>

                                                    <CardModifyCommentAdmin adminComment={x.fk_id_user}></CardModifyCommentAdmin>

                                                </div>
                                            </>
                                        }
                                    </article>
                                </li>
                            );
                        } else {
                            const date = new Date(x.date);

                            return (
                                <li key={x.post_id}>
                                    {/* Partie image */}
                                    <article className="card">
                                        <img
                                            className="profileCommentImage"
                                            src="./images/img1.png"
                                            alt="logo Entreprise"
                                        />
                                        <h3 className="profileName">
                                            {x.content} à publier
                                            <br />
                                            {`Le ${date.getDate()} ${date.getMonth() +
                                                1} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}
                                            <br />
                                            {x.created_at}
                                            <img
                                                className="getAllImage_image"
                                                src={x.media_url}
                                                alt="imagepersonnel"
                                            />
                                        </h3>
                                        <p className="profileComment">
                                            <em>
                                                <strong>Légende</strong>
                                            </em>{" "}
                                            : {x.title}{" "}
                                        </p>
                                        <div className="profileComments">
                                            {/* Component pour like image */}
                                            <CardLikeImage idLike={x.post_id} />

                                            {/* Components poster un commentaire sur image page accueil */}
                                            <ImageOneComment idy={x.post_id} />
                                        </div>

                                        {/* Components voir commentaire sur une image page accueil */}
                                        <CardGetAllCommentImage isAdmin={isAdmin} commentIdy={x.post_id} />

                                        {/* { Fonction administrateur */}
                                        {isAdmin !== 1 ||
                                            <>
                                                <div className="admin_img_card">

                                                    <button
                                                        aria-label="effacer"
                                                        onClick={() => deleteCardImg(x.post_id)}>
                                                        <i className="fas fa-trash-alt poubelle" />
                                                    </button>

                                                    <CardModifyImgAdmin adminImg={x.fk_id_user}></CardModifyImgAdmin>

                                                </div>
                                            </>
                                        }
                                    </article>
                                </li>
                            );
                        }
                    })
                    : <h3 className="profileScreenEntete">
                        Il y a aucune publication pour le moment
                    </h3>}
            </section>
        </div>
    );
}

export default CardPrincipal;
