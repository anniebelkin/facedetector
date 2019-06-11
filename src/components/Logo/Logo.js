import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='center ma4'>
            <Tilt className="Tilt dn db-ns box-bg br2 shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={face}/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;