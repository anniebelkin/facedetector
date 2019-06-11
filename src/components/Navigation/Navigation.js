import React from 'react';

const Navigation = ({onRouteChange}) => {
    return (
        
            <div className='absolute top-0 right-0'>
                <p onClick={() => onRouteChange('signin')} className='f5 ma4 link dim white underline pa3 pointer'>Sign Out</p>
            </div>
        
    );
}

export default Navigation;