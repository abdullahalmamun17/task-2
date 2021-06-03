import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '45%'
    }
};

Modal.setAppElement('#root')

const EditModal = ({ modalIsOpen, handleEditedData, post, closeModal }) => {
    const [editedData, setEditedData] = useState({})

    const handleEditPost = (e) => {
        e.preventDefault()
        if (editedData.title || editedData.body) {
            handleEditedData(editedData)
            setEditedData({})
        }
    }
    const handleOnChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <form onSubmit={handleEditPost}>
                    <h6>Title</h6>
                    <input className="form-control mb-4" defaultValue={post.title} onChange={handleOnChange} name="title" type="text" />
                    <h6>Status</h6>
                    <textarea className="form-control mb-3" rows="5" defaultValue={post.body} onChange={handleOnChange} name="body" type="text" />
                    <input type="submit" value="Update Post" className="btn btn-primary me-3" />
                    <button onClick={closeModal} className="btn btn-secondary">Close</button>
                </form>
            </Modal>
        </div>
    );
}

export default EditModal;