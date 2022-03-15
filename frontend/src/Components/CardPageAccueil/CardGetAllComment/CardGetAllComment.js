import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

// CSS
import "./CardGetComment.css";

// ===== Components pour VOIR LES COMMENTAIRES MESSAGES dans card page accueil =====
function CardGetComment(props) {
    let isAdmin = props.isAdmin;
    const authUser = parseInt(localStorage.id, 10);
    const prenom = JSON.parse(localStorage.prenom);
    const commentRegex = /(.*[A-Za-z]){5,30}/;
    const [messageItem, setmessageItemModify] = useState("");
    const [com, setcom] = useState("");

    // Ouverture fenêtre
    const [isGetActive, setGetisActive] = useState("");
    const openFieldset = () => {
        if (isGetActive === "active") {
            setGetisActive("");
        } else {
            setGetisActive("active");
        }
    };

    useEffect(
        () => {
            Axios.get(
                `http://localhost:3001/api/comments/${props.messageid}`
            ).then(response => {
                setcom(response.data.result);
            });
        },
        [props.messageid]
    );

    // Fonctions supprimer commentaire page accueil
    const handleDelete = async id => {
        if (
            window.confirm(
                `${prenom} êtes vous sur de vouloir supprimer votre commentaire`
            )
        ) {
            try {
                await Axios.delete(`http://localhost:3001/api/comments/${id}`);
                setcom(com.filter(x => x.comment_id !== id));
                alert("Votre commentaire à bien été supprimer");
            } catch (error) {
                alert(
                    "Une erreur s'est produite lors de lasuppression du commentaire, veuillez réessayer"
                );
            }
        }
    };
    // ======

    // Fonction modifier commentaire
    const [isModify, setisModify] = useState({ id: null, active: false });
    const handleEdit = id => {
        if (isModify.active) {
            setisModify({ id, active: false });
        } else {
            setisModify({ id, active: true });
        }
    };

    const addModify = commentId => {
        if (
            window.confirm(
                `${prenom} êtes vous sur de vouloir modifier votre commentaire`
            )
        ) {
            addModifyDefini(commentId);
        } else {
            window.location.reload();
        }
    };

    const addModifyDefini = commentId => {
        if (commentRegex.test(messageItem)) {
            Axios.put("http://localhost:3001/api/comments/" + commentId, {
                commentaire: messageItem
            })
                .then(() => {
                    alert(`${prenom} vous venez de modifier votre commentaire `);
                    window.location.reload();
                })
                .catch(err => {
                    alert("Une erreur est survenue, veuillez réessayer");
                });
        } else {
            alert("Veuillez insérer un minimum de 5 caractères");
        }
    };
    // ======

    // JSX

    return (
        <div className="get">
            <fieldset className="fieldset">
                <legend className="getcomment_fieldset" onClick={openFieldset}>
                    Voir les commentaires
                </legend>
                <section className={`getsection ${isGetActive}`}>
                    {com && com.length
                        ? com.map(x => {
                            const valide = authUser === x.user_id;
                            const valida = valide || isAdmin;

                            return (
                                <ul key={x.comment_id} className="getcomment">
                                    <li className="getcomment_prenom">
                                        {x.prenom} vous à commenter :
                                    </li>
                                    <li className="getcomment_content">
                                        {x.content}
                                    </li>

                                    {/* Si user ou admin correspond pour modifier ou effacer commentaire page accueil*/}
                                    {valida || valide
                                        ? <div>
                                            <div
                                                className={`section_modify_comment_accueil ${x.comment_id ===
                                                    isModify.id && isModify.active
                                                    ? "active"
                                                    : ""}`}>
                                                <label className="label">a</label>
                                                <input
                                                    title="commentaires"
                                                    className="accueil_input"
                                                    id="commentaires"
                                                    type="text"
                                                    placeholder="Modifier votre commentaire"
                                                    onChange={event => {
                                                        if (commentRegex.test(event.target.value)) {
                                                            setmessageItemModify(event.target.value);
                                                            return;
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="validate_accueil">
                                                {/* Boutton modifier message page accueil */}
                                                <button
                                                    title="modifier"
                                                    className="deleModif"
                                                    onClick={() => handleEdit(x.comment_id)}>
                                                    <i className="fas fa-edit stylo" />
                                                </button>

                                                {/* Boutton effacer message page accueil */}
                                                <button
                                                    title="supprimer"
                                                    className="deleModif"
                                                    onClick={() => handleDelete(x.comment_id)}>
                                                    <i className="fas fa-trash-alt poubelle" />
                                                </button>

                                                {/* Boutton valider modification message */}
                                                <button title="valider" className="deleModif">
                                                    <i
                                                        className="fas fa-check accueil"
                                                        onClick={() => addModify(x.comment_id)}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        : <li />}
                                </ul>
                            );
                        })
                        : <li>Vous avez aucun commentaire</li>}
                </section>
            </fieldset>
        </div>
    );
}
export default CardGetComment;
