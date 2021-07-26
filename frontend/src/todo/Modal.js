import React from 'react'

const Modal = ({closeModal, modalContent}) => {
    React.useEffect(() => {
        setTimeout(() => {
            closeModal();
        },3000);
    },[])

    return (
        <div>
            <p>{modalContent}</p>
        </div>
    )
}

export default Modal
