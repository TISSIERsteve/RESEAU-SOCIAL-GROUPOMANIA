import React from 'react';
import { useState } from "react"
import Axios from 'axios';

// CSS
import "./CardPostComment.css"

// ===== Components COMMENTER SUR UN MESSAGE dans card sur Page accueil =====
function CardPostComment(props) {

    const compte = JSON.parse(localStorage.id)
    const prenom = JSON.parse(localStorage.prenom)
    const [commentaires, setcommentaires] = useState('')
    const commentRegex = /(.*[A-Za-z]){5,30}/;

    // Ouverture fenêtre 
    const [isActive, setisActive] = useState("")
    const handleShow = () => {
        if (isActive === "active") {
            setisActive("")

        } else {
            setisActive("active")
        }
    }

    // Fonction ajout commentaire
    const addCommentUser = () => {
        if (window.confirm(`${prenom} êtes vous sur de vouloir publier votre commentaire`)) {
            addCommentUserDefini()
        } else {
            window.location.reload()
        }
    }

    const addCommentUserDefini = () => {
        if (commentRegex.test(commentaires)) {
            Axios.post("http://localhost:3001/api/comments", {
                commentaires,
                compte,
                id_post: props.idPost
            })
                .then(() => {
                    alert(`${prenom} vous venez de commenter `);
                    window.location.reload()
                })
                .catch(err => {
                    alert("Une erreur est survenue, veuillez réessayer");
                });
        } else {
            alert("Veuillez insérer un minimum de 5 caractères")
        }
    }

    // JSX
    return (
        <>

            <p className='boutton_commenter' onClick={handleShow}>Commenter</p>
            <div className={`profilesCommentsInput open ${isActive}`}>
                <label id='commentaires' className='label'>a</label>
                <input
                    title='commentaires'
                    className="profilesComments"
                    id='commentaires'
                    type="text"
                    placeholder="Commentez la publication"
                    onChange={(event) => {
                        if (commentRegex.test(event.target.value)) {
                            setcommentaires(event.target.value)
                            return
                        }
                    }}
                ></input>

                <button title='modifier' className='btn_modify'>
                    <i className="fas fa-check valide" onClick={addCommentUser}></i>
                </button>

            </div>
        </>
    )
}
export default CardPostComment;
