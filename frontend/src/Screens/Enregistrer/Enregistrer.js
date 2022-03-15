import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// CSS
import "./Enregistrer.css";

// ===== Page création compte =====
function Enregistrer() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const nomRegex = /(.*[A-Za-z]){3,30}/;
    const prenomRegex = /(.*[A-Za-z]){3,30}/;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    // Fonction enregistrer compte
    const addUser = e => {
        e.preventDefault();

        if (
            nomRegex.test(nom) &&
            prenomRegex.test(prenom) &&
            pwdRegex.test(password) &&
            mailRegex.test(email)
        ) {
            Axios.post("http://localhost:3001/api/auth/signup", {
                nom: nom,
                prenom: prenom,
                password: password,
                email: email
            })
                .then(() => {
                    alert(`Bravo ${prenom} tu viens de t'inscrire sur GROUPOMANIA`);

                    navigate("/AccountScreen", { replace: true });
                })
                .catch(err => {
                    alert("Cette adresse e-mail est déjà utiliser, veuillez en choisir une autre.");
                });
        } else {
            alert("Merci de remplir tous les champs");
        }
    };

    // JSX
    return (
        <div className="RegistrationScreen">
            <Link to="/">
                <i className="fas fa-arrow-left flecheGauche" /> retour
            </Link>

            {/* Formulaire d'inscription */}
            <div>
                <form className="form">
                    <div>
                        <h2>Créer un compte</h2>
                    </div>

                    <div>
                        <label htmlFor="nom">Nom:</label>
                        <input
                            required
                            placeholder="Entrer nom"
                            id="nom"
                            type="text"
                            onChange={event => {
                                if (nomRegex.test(event.target.value)) {
                                    setNom(event.target.value);
                                    document.getElementById("span1").style.color = "green";
                                    document.getElementById("span1").innerHTML = "Nom Valide";
                                } else {
                                    document.getElementById("span1").style.fontWeight = "bold";
                                    document.getElementById("span1").style.color = "red";
                                    document.getElementById("span1").innerHTML =
                                        "Veuillez renseigner minimun 3 caractères";
                                }
                            }}
                        />
                        <span id="span1" />
                    </div>
                    <div>
                        <label htmlFor="prenom">Prénom:</label>
                        <input
                            required
                            placeholder="Entrer prénom"
                            id="prenom"
                            type="test"
                            onChange={event => {
                                if (prenomRegex.test(event.target.value)) {
                                    setPrenom(event.target.value);
                                    document.getElementById("span2").style.color = "green";
                                    document.getElementById("span2").innerHTML = "Prénom Valide";
                                } else {
                                    document.getElementById("span2").style.fontWeight = "bold";
                                    document.getElementById("span2").style.color = "red";
                                    document.getElementById("span2").innerHTML =
                                        "Veuillez renseigner minimun 3 caractères";
                                }
                            }}
                        />
                        <span id="span2" />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            required
                            placeholder="Renseigner un mot de passe"
                            id="password"
                            type="password"
                            onChange={event => {
                                if (pwdRegex.test(event.target.value)) {
                                    setpassword(event.target.value);
                                    document.getElementById("span3").style.color = "green";
                                    document.getElementById("span3").innerHTML =
                                        "Mot de passe valide";
                                } else {
                                    document.getElementById("span3").style.fontWeight = "bold";
                                    document.getElementById("span3").style.color = "red";
                                    document.getElementById("span3").innerHTML =
                                        "Veuillez renseigner 8 caractères minimun avec chiffres";
                                }
                            }}
                        />
                        <span id="span3" />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            required
                            placeholder="Entrer une adresse mail"
                            id="email"
                            type="email"
                            onChange={event => {
                                if (mailRegex.test(event.target.value)) {
                                    setemail(event.target.value);
                                    document.getElementById("span4").style.color = "green";
                                    document.getElementById("span4").innerHTML =
                                        "Adresse e-mail valide";
                                } else {
                                    setemail("")
                                    document.getElementById("span4").style.fontWeight = "bold";
                                    document.getElementById("span4").style.color = "red";
                                    document.getElementById("span4").innerHTML =
                                        "Veuillez renseigner une adresse e-mail valide";
                                }
                            }}
                        />
                        <span id="span4" />
                    </div>
                    <br />
                    <div>
                        <button onClick={addUser}>Enregistrer</button>
                    </div>
                    <br />
                    <div>
                        <div>
                            Vous avez déjà un compte ?
                            <Link to="/AccountScreen"> S'identifier</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Enregistrer;
