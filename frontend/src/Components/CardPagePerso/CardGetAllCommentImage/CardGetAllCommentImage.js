import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

// Components pour obtenir un commentaire poster sur une image page perso
function CardGetAllCommentImage(props) {
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
                `http://localhost:3001/api/contentImg/${props.idImg}`
            ).then(response => {
                setcom(response.data.result);
            });
        },
        [props.idImg]
    );
    // JSX
    return (
        <div className="get">
            <fieldset className="fieldset" onClick={openFieldset}>
                <legend className="getcomment_fieldset">Voir les commentaires</legend>
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

export default CardGetAllCommentImage;
