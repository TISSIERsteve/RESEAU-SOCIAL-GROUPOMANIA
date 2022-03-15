import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";

// Components
import AjouterImageItem from "./Components/Header/Barre/AjouterImage/AjouterImageItem";

// Screens
import Connexion from "./Screens/Connexion/Connexion";
import Enregistrer from "./Screens/Enregistrer/Enregistrer";
import PageConnexionEnregistrer from "./Screens/PageConnexionEnregistrer/PageConnexionEnregistrer";
import PagePerso from "./Screens/PagePerso/PagePerso";
import PageAccueil from "./Screens/PageAccueil/PageAccueil";

function App() {
    Axios.defaults.headers.common.Authorization = localStorage.bearer;

    let jour = new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    // JSX
    return (
        <Router>
            <div className="grid-container">
                <header>
                    <div className="entete">
                        <h1>
                            <img
                                className="logo_entreprise"
                                src="../images/img4.png"
                                alt="Logo entreprise"
                            />
                        </h1>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<PageConnexionEnregistrer />} />
                        <Route path="/RegistrationScreen" element={<Enregistrer />} />
                        <Route path="/AccountScreen" element={<Connexion />} />
                        <Route path="/ProfileScreen" element={<PageAccueil />} />
                        <Route path="/PersoProfileScreen" element={<PagePerso />} />
                        <Route path="/AddPickItem" element={<AjouterImageItem />} />
                    </Routes>
                </main>

                <footer>
                    <div className="piedPage">
                        <h2>Tout droits réservé GROUPOMANIA ®-2022-</h2>
                    </div>

                    {/* Heure */}
                    <div className="profileScreenDate">
                        {jour}
                    </div>
                </footer>
            </div>
        </Router>
    );
}
export default App;
