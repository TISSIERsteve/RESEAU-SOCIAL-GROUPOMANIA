import React from "react";

// CSS
import "./Bouton.css";

// ===== Components Bouton ouvrir barre latérale =====
function Bouton() {
    // Open boutton
    const open = () => {
        document.getElementById("open").classList.toggle("active");
    };

    // JSX
    return (
        <div>
            <button
                aria-label="ouvrir"
                onClick={open}
                type="button"
                className="open-sidebar button_sidebar">
                <i className="fa fa-bars" />
            </button>
        </div>
    );
}
export default Bouton;
