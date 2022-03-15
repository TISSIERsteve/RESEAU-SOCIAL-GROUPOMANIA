import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// Components
import CardGetAllCommentImage from "../../Components/CardPageAccueil/CardGetAllCommentImage/CardGetAllCommentImage";
import CardModifyComment from "../../Components/CardPagePerso/CardModifyComment.js/CardModifyComment";
import SeeComment from "../../Components/CardPagePerso/CardGetAllComment/CardGetAllComment";
import CardModifyImg from "../../Components/CardPagePerso/CardModifyImg/CardModifyImg";

// import CardGetAllImage from "../../Components/CardPagePerso/CardGetallImage/CardGetAllImage";

// CSS
import "./PagePerso.css";

// ===== Page perso voir touts mes posts (images ou messages) =====
function PagePerso() {
    const navigate = useNavigate();
    const prenom = JSON.parse(localStorage.prenom);
    const identifiant = JSON.parse(localStorage.id);
    const [post, setpost] = useState("");

    useEffect(
        () => {
            Axios.get("http://localhost:3001/api/messagesPerso/" + identifiant)
                .then(response => {
                    console.log(response.data.result);
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
        [identifiant, navigate]
    );

    // Supprimer un message
    const deleteCom = e => {
        if (window.confirm("Voulez vous vraiment supprimer ce message ?")) {
            deleteDefini(e);
        }
    };

    const deleteDefini = id => {
        Axios.delete(
            "http://localhost:3001/api/messagesPerso/" + id
        ).then(response => {
            alert("Votre message à bien été supprimé");
            window.location.reload();
        });
    };

    // Supprimer image page perso
    const deleteImg = e => {
        if (window.confirm("Voulez vous vraiment supprimer votre image ?")) {
            deleteImgDefini(e);
        }
    };

    const deleteImgDefini = id => {
        Axios.delete("http://localhost:3001/api/posts/" + id).then(response => {
            alert("Votre image à bien été supprimé");
            window.location.reload();
        });
    };

    // JSX
    return (
        <div>
            <Link to="/ProfileScreen">
                <i className="fas fa-arrow-left flecheGauche" /> retour
            </Link>

            {/*  Partie dynamique mes messages perso   */}
            <section className="itemsPerso">
                <div className="persoprofilescreen_prenom">
                    <h2>
                        Voici vos publications {prenom}
                    </h2>
                </div>
                {/* Partie message */}
                {post && post.length
                    ? post.map(x => {
                        const date = new Date(x.date);
                        if (x.message_perso_id) {
                            return (
                                <li key={x.message_perso_id}>
                                    <article className="card">
                                        <div className="cardProfilePerso">
                                            <img
                                                className="profileCommentImage"
                                                src="./images/img1.png"
                                                alt="logo Entreprise"
                                            />
                                        </div>
                                        <h3 className="profileName">
                                            {x.prenom} à publier
                                            <br />
                                            {`Le ${date.getDate()} ${date.getMonth() +
                                                1} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}
                                            <br />
                                            {x.created_at}
                                        </h3>
                                        <p className="profileComment">
                                            {" "}{x.commentaire}{" "}
                                        </p>

                                        {/* Component pour modifier mes messages sur page perso */}
                                        <CardModifyComment />

                                        {/* Components voir commentaire message page perso */}
                                        <SeeComment identite={x.message_perso_id} />

                                        <div className="trash">
                                            <button
                                                title="supprimer"
                                                onClick={() => deleteCom(x.message_perso_id)}>
                                                <i className="fas fa-trash-alt poubelle" />
                                            </button>
                                        </div>
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
                                            alt="Entreprise"
                                        />
                                        <h3 className="profileName">
                                            {x.content} à publier
                                            <br />
                                            {`Le ${date.getDate()} ${date.getMonth() +
                                                1} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}
                                            <br />
                                            {x.created_at}
                                            <br />
                                            <img
                                                className="getAllImage_image"
                                                src={x.media_url}
                                                alt="image_publier"
                                            />
                                        </h3>
                                        <p className="profileComment">
                                            <em>
                                                <strong>Légende</strong>
                                            </em>{" "}
                                            : {x.title}{" "}
                                        </p>

                                        {/* Components pour modifier image page perso */}
                                        <CardModifyImg />

                                        {/* Components pour voir commentaires image page perso */}
                                        <CardGetAllCommentImage idImg={x.post_id} />

                                        <div className="trash">
                                            <button
                                                title="supprimer"
                                                onClick={() => deleteImg(x.post_id)}>
                                                <i className="fas fa-trash-alt poubelle_img" />
                                            </button>
                                        </div>
                                    </article>
                                </li>
                            );
                        }
                    })
                    : <h3 className="profileScreenEntete">
                        Vous n'avez rien publier pour le moment
                    </h3>}
            </section>
        </div>
    );
}
export default PagePerso;
