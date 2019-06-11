import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='center mt-2'>
                
            <div className='form pa4 br3 shadow-5' style={{ width:'700px'}}>
                <p className='f5 white'>
                    {'I can recognize faces in your pictures. Give it a try :)'}
                </p>
                <input 
                    placeholder = 'Your image URL'
                    className='f4 pa2 w-70 center' 
                    type='text' 
                    onChange={onInputChange}
                />
                <br/>
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-purple' 
                    onClick={onButtonSubmit}
                >
                    <span>&#128269;<span className='dn db-ns'>Detect</span></span>
                </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;