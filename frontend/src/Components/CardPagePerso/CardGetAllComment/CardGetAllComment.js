import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

// CSS
// import "./GetComment.css"

// ===== Components récupére commentaire message que l'on nous à poster sur ma page perso =====
function CardGetAllComment(props) {
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
                `http://localhost:3001/api/comments/${props.identite}`
            ).then(response => {
                setcom(response.data.result);
            });
        },
        [props.identite]
    );

    // JSX
    return (
        <div className="get">
            <fieldset className="fieldset" onClick={openFieldset}>
                <legend className="getcomment_fieldset">
                    Voir les commentaires reçus
                </legend>
                <section className={`getsection ${isGetActive}`}>
                    {com && com.length
                        ? com.map(x => {
                            return (
                                <ul key={x.comment_id} className="getcomment">
                                    <li className="getcomment_prenom">
                                        {x.prenom} vous à commenter :
                                    </li>
                                    <li className="getcomment_content">
                                        {x.content}
                                    </li>
                                </ul>
                            );
                        })
                        : <li>Vous avez aucun commentaire</li>}
                </section>
            </fieldset>
        </div>
    );
}
export default CardGetAllComment;
