import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import http from '../../http/HttpService';
import './UploadModal.css'

export default class UploadModal extends React.Component {
    constructor(){
        super();
        this.state = {
            drag: false,
            item: null,
            holder: null
        }
    }
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true})
        }
    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({drag: false})
        }
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.setState({item:URL.createObjectURL(e.dataTransfer.files[0]),  holder: e.dataTransfer.files[0]});
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    }
    
    onClickUploadProfilePic = () => {
        const formData = new FormData();
        formData.append('file',this.state.holder);
        http.post("file", formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        .then(r=>{
            if(r.status === 201){
                window.location.reload();
            }
        })
        .catch(e=>console.log(e))
    }
    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>Drag&drop to upload</Modal.Header>
                <Modal.Body>
                    <div className="upload-body" onDrop={this.handleDrop} onDragOver={this.handleDrag} onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut}>
                        {
                            this.state.item === null ?
                                <span>Drop&drop or choose from a file</span> :
                                <img height="300" src={this.state.item}/>
                        }
                    </div>
                    <Button className="upload-btn" onClick={this.onClickUploadProfilePic}>UPLOAD</Button>
                </Modal.Body>
            </Modal>
        )
    }
}