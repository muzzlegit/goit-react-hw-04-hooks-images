import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) { 
    useEffect (() => {
        const handleKeydown = event => {
            if(event.code === 'Escape'){
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => {window.removeEventListener('keydown', handleKeydown)};
    },[onClose]);



    const handleBackdropClick = event => {
        if(event.target === event.currentTarget){
            onClose();
        }
    }

        return createPortal(
            <Overlay onClick = { handleBackdropClick }>
                <ModalBox >
                    {children}
                </ModalBox>
            </Overlay>,
            modalRoot
            )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
