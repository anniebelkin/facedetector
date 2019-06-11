import React from 'react';

const Rank = ({ user }) => {
    return (
        <div className='absolute top-0 left-0'>
            <div className='ma4'>
                <p>Hello {user.name}</p>
                <p>Current Rank: {user.entries}</p>
            </div>
        </div>
        
    );
}

export default Rank;