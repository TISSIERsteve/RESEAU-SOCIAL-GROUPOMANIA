import React from "react";
import { useState } from "react";
import Axios from "axios";

// CSS
import "../ModifyCommentAdmin/ModifyCommentAdmin.css";

// Components ADMIN MODIFIER COMMENTAIRE
function ModifyCommentAdmin({ adminComment }) {
    const [message, setmessageModify] = useState("");
    const commentRegex = /(.*[A-Za-z]){5,30}/;

    // Ouverture fenêtre
    const [isActive, setisActive] = useState("");
    const AdminModifyComment = () => {
        if (isActive === "active") {
            setisActive("");
        } else {
            setisActive("active");
        }
    };

    // Fonction modifier message
    const addCommentModify = id => {
        if (
            window.confirm(
                `En tant qu'administrateur êtes vous sur de vouloir modifier le message`
            )
        ) {
            addCommentModifyDefini(id);
        } else {
            window.location.reload();
        }
    };

    const addCommentModifyDefini = id => {
        console.log(id);
        if (commentRegex.test(message)) {
            Axios.put("http://localhost:3001/api/messagesPerso/" + id, {
                commentaire: message
            })
                .then(() => {
                    alert(`En tant qu'administrateur vous venez de modifier le message `);
                    window.location.reload();
                })
                .catch(err => {
                    alert("Une erreur est survenue, veuillez réessayer");
                });
        } else {
            alert("Veuillez insérer un minimum de 5 caractères");
        }
    };

    // JSX
    return (
        <div className="cardModifyCommentAdmin">
            <button title="modifier" onClick={AdminModifyComment}>
                <i className="fas fa-edit stylo" />
            </button>

            <div className={`profilesCommentsInput open ${isActive}`}>
                <form className="form">
                    <label className="label">a</label>
                    <input
                        title="modifier commentaire"
                        className="input_admin"
                        id="commentaires"
                        type="text"
                        placeholder="Modifier le message en tant qu'administrateur"
                        onChange={event => {
                            if (commentRegex.test(event.target.value)) {
                                setmessageModify(event.target.value);
                                return;
                            }
                        }}
                    />
                    <button className="btn_modify" aria-label="valider">
                        <i
                            className="fas fa-plus-circle valide"
                            onClick={() => addCommentModify(adminComment)}
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModifyCommentAdmin;
