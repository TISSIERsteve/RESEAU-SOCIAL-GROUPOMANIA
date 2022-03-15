import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

// Components
import BarreLaterale from "../../Components/BarreLaterale/BarreLaterale/BarreLaterale";
import Bouton from "../../Components/BarreLaterale/BoutonBarre/BouttonBarre";
import BarrePostMessage from "../../Components/Header/BarrePostMessage/PostMessage";
import BarrePostImage from "../../Components/Header/Barre/BarrePostImage";
import CardPrincipal from "../../Components/CardPageAccueil/CardPrincipal/CardPrincipal";

// CSS
import "./PageAccueil.css";

// ===== Page principal accueil =====
function PageAccueil() {
    const [isAdmin, setIsAdmin] = useState(0);
    useEffect(
        () => {
            Axios.get(
                "http://localhost:3001/api/auth/loginIsAdmin/" + localStorage.id
            ).then(res => {
                setIsAdmin(res.data.isAdmin);
            });
        },
        [setIsAdmin]
    );

    // Si token j'affiche la page accueil profil
    if (localStorage.bearer) {
        return (
            <div>
                {/* Component Bouton */}
                <Bouton />

                {/* Component Barre laterale */}
                <div id="open" className="aside_form">
                    <BarreLaterale isAdmin={isAdmin} />
                </div>

                {/* Components barre poste de message */}
                <div>
                    <BarrePostMessage />
                </div>

                {/* Component Barre poste d'image */}
                <div className="container">
                    <BarrePostImage />
                </div>

                {/*  Component card principal */}
                <CardPrincipal isAdmin={isAdmin} />
            </div>
        );

        // Sinon pas token return page accueil
    } else {
        return <Navigate to="/" />;
    }
}
export default PageAccueil;
