import React from "react";
import { useState } from "react";
import Axios from "axios";

// CSS
import "./CardModifyImg.css";

// Components pour modifier une image perso sur page perso
function CardModifyImg() {
    const idyImg = JSON.parse(localStorage.id);

    const imgRegex = /(.*[A-Za-z]){5,30}/;

    const [legende, setlegende] = useState("");
    const [postPicture, setPostPicture] = useState(null);

    // J'importe une image
    const handlePicture = e => {
        setPostPicture(e.target.files[0]);
    };

    // Ouverture fenêtre
    const [isActive, setisActive] = useState("");
    const modifyImg = () => {
        if (isActive === "active") {
            setisActive("");
        } else {
            setisActive("active");
        }
    };

    // Fonction envoie image bdd
    const addModifyImg = e => {
        e.preventDefault();
        window.confirm("Voulez vous vraiment modifier l'image sur groupomania");
        addImgItem();
    };

    const addImgItem = () => {
        if (imgRegex.test(legende)) {
            const formData = new FormData();
            formData.append("fk_id_user", localStorage.id);
            formData.append("legende", legende);
            formData.append("image", postPicture);
            Axios.put(`http://localhost:3001/api/posts/${idyImg}`, formData)
                .then(response => {
                    alert("Votre image à été modifiée");
                    window.location.reload();
                })
                .catch(err => {
                    if (err.response.data) {
                        alert("Veuillez renseigner tous les champs pour modifier l'image");
                    }
                });
        } else {
            alert(
                "Veuillez à remplir tous les champs avec un minimun de 5 caractéres"
            );
            return;
        }
    };

    // Supprimer image si erreur avant de l'enregistrer
    const removeModifyImg = () => {
        window.confirm("Voulez vous vraiment annuler la modification apportée");
        removeModifyImgItem();
    };
    const removeModifyImgItem = () => {
        window.location.reload();
    };

    return (
        <div>
            <div className="pen">
                <button title="modifier l'image" onClick={modifyImg}>
                    <i className="fas fa-edit stylo_img" />
                </button>
            </div>

            <div>
                <div className={`addPickItem modify_img ${isActive}`}>
                    <h2 className="addPickItem_titre">Modifier l'image</h2>
                    <form className="addPickItem_form_modify">
                        <div className="addPickItem_file">
                            <div className="addModifyItem">
                                <label>Document(s) à télèchargé</label>
                                <input
                                    title="modifier image"
                                    className=""
                                    required
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={e => handlePicture(e)}
                                />
                            </div>
                            <img className="addPickItem_img" src={postPicture} alt="" />
                        </div>
                        <div className="addPickItem_button_img">
                            <input
                                title="ajouter une legende"
                                type="text"
                                placeholder="Mettre une légende"
                                required
                                onChange={event => {
                                    if (imgRegex.test(event.target.value)) {
                                        setlegende(event.target.value);
                                        return;
                                    }
                                }}
                            />
                            <div className="addPickItem_item_img">
                                <button className="brt_img" onClick={addModifyImg}>
                                    Valider
                                </button>
                                <button className="brt_img" onClick={removeModifyImg}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CardModifyImg;
