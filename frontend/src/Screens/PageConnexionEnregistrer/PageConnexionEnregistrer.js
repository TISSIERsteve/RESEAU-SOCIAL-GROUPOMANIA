import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./PageConnexionEnregistrer.css";

// Page pour choisir soit connexion soit création compte
function PageConnexionEnregistrer() {

    if (localStorage.bearer) {
        window.location.replace("./ProfileScreen")

    } else {
        return (
            <div className="homeScreen">
                <main>
                    <nav className="homeScreen_navLink">
                        <div className="homeScreen_title">
                            <h2>Vous n'êtes pas identifié</h2>
                        </div>
                        <div className="homeScreen_navLink_item">
                            <Link to="/AccountScreen">Se connecter</Link> <strong>ou</strong>
                            <Link to="/RegistrationScreen">Créer un compte</Link>
                        </div>
                    </nav>
                </main>
            </div>
        );
    }
}
export default PageConnexionEnregistrer;
