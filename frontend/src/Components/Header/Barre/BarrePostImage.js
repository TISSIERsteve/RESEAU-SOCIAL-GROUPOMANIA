import React from "react";

// CSS
import "./BarrePostImage.css";

// Components
import AjouterImage from "./AjouterImage/AjouterImage";

// Page de la barre search publication
function BarrePostImage() {
    // JSX
    return (
        <div>
            {/* Barre container */}
            <ul className="profileScreenTele">
                {/* Component ajouter img */}
                <AjouterImage />
            </ul>
        </div>
    );
}

export default BarrePostImage;
