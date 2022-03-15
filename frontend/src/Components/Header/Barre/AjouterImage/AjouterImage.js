import React from 'react';
import { Link } from "react-router-dom"

// ===== Components ajouter image =====
function AjouterImage() {

    return (
        <>
            <li className='animation'>Attention à vos propos</li>
            <li>
                <Link to="/AddPickItem" aria-label='ajouter image' >
                    <i className="fas fa-camera"></i>
                </Link>
            </li>
        </>
    )
}

export default AjouterImage;