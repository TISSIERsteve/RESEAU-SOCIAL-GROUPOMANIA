import React from "react";
import Axios from "axios";
import { useState } from "react";

// CSS
import "./PostMessage.css";

// ===== Components barre pour poster un message =====
function Search() {
    const storage = JSON.parse(localStorage.prenom);
    const [commentaire, setcommentaire] = useState("");
    const commentRegex = /(.*[a-z]){5,30}/;

    // Fonction publication message
    const addComment = () => {
        if (
            window.confirm(`${storage} voulez vous vraiment publier ce message ?`)
        ) {
            addCommentDefini();
        }
    };

    const addCommentDefini = () => {
        let prenom = JSON.parse(localStorage.prenom);
        let id = JSON.parse(localStorage.id);

        if (commentRegex.test(commentaire)) {
            Axios.post("http://localhost:3001/api/messagesPerso", {
                prenom: prenom,
                commentaire: commentaire,
                id: id
            })
                .then(() => {
                    alert("Votre message est maintenant visible sur GROUPOMANIA");
                    window.location.reload();
                })
                .catch(err => alert("Votre message n'a pu être publier"));
        } else {
            alert("Veuillez insérer un minimum de 5 caractères");
        }
    };
    // JSX
    return (
        <div>
            <form>
                {/* Affichage du nom */}
                <div className="profileScreenPrenom">
                    <label htmlFor="commentaire">
                        Bonjour {storage} comment vas tu aujourd'hui ?
                    </label>
                </div>

                {/* Barre de publication message */}
                <div className="profileScreen_BarreRecherche">
                    <input
                        className="profileScreenInput"
                        id="commentaire"
                        type="text"
                        placeholder="Quoi de neuf, mettez votre message ici ?"
                        onChange={event => {
                            if (commentRegex.test(event.target.value)) {
                                setcommentaire(event.target.value);
                                return;
                            }
                        }}
                    />

                    <span>
                        <i className="fas fa-check add" onClick={addComment} />
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Search;
