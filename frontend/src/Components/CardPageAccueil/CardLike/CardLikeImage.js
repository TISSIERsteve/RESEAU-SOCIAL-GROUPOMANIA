import React from "react";
import { useEffect, useState, useCallback } from "react";
import Axios from "axios";

// CSS
import "./CardLikeImage.css";

// Components pour like image
function CardLikeImage({ idLike }) {

    // Afficher les likes images
    const [userlikes, setUserLikes] = useState([]);

    const getLikes = useCallback(
        () => {
            Axios.get(`http://localhost:3001/api/posts/${idLike}`).then(response => {
                setUserLikes(response.data.result);
            });
        },
        [idLike]
    );

    useEffect(
        () => {
            getLikes();
        },
        [getLikes]
    );

    // Poster un like image
    const authUser = parseInt(localStorage.id, 10);
    const addLike = id => {
        Axios.put(`http://localhost:3001/api/posts/${id}/likeImg`, {
            userId: authUser
        }).then(() => getLikes());
    };

    // JSX
    return (
        <div className="like_dislike">
            <div className="like">
                <button className="btn_like up" onClick={() => addLike(idLike)}>
                    Up <i className="fas fa-thumbs-up " />
                </button>

                {userlikes && userlikes.length
                    ? userlikes.map(x => {
                        if (x.post_id === idLike) {
                            return (
                                <ul key={x.post_id}>
                                    <li className={x.likes_id.length && x.likes_id.includes([authUser]) ? `couleur.active` : `couleur`}>
                                        <p className="aime">J'aime</p>
                                    </li>
                                    <li>
                                        {!x.likes_id ? "0" : JSON.parse(x.likes_id).length} like(s)
                                    </li>
                                </ul>
                            );
                        }
                        return null;
                    })
                    : <li />}
            </div>
        </div>
    );
}

export default CardLikeImage;
