import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import SignInBody from './SignInBody';
import SignUpBody from './SignUpBody'
import './SignInModal.css'

export default class SignInModal extends React.Component{
    constructor(){
        super();
        this.state = {
            signOption: null
        }
    }
    renderSigningOptions = () => {
        switch(this.state.signOption){
            case null:
                return (
                        <Modal.Body>
                            <div className="sign-options-button-container">
                                <div>
                                    <Button className="sign-btn-color" onClick={() => this.onClickSelectSignOption('signin')}>Sign in</Button>
                                    <small className="btn-info-label">Already have an account?</small>
                                </div>
                                <div>
                                    <Button className="sign-btn-color" onClick={() => this.onClickSelectSignOption('signup')}>Create a new account?</Button>
                                    <small className="btn-info-label">Join with us</small>
                                </div>
                            </div>
                        </Modal.Body>
                );
                break;
            case 'signin': return (<SignInBody />); break;
            case 'signup': return (<SignUpBody />); break;
        }
    }
    onClickSelectSignOption = (option) => {
        this.setState({signOption: option});
    }
    setDefaultSignOption = () => {
        this.setState({signOption: null});
    }
    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                    <div>
                        <span className="header-main-text">Doge</span>
                        <span className="header-sub-text">hub</span>
                    </div>
                    {
                        this.state.signOption ?
                            <span className="back-option-btn" onClick={this.setDefaultSignOption}>back</span>
                            :
                            null
                    }
                </Modal.Header>
                {
                    this.renderSigningOptions()
                }
            </Modal>
        )
    }
}