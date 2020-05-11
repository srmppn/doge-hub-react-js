import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import './SignUpBody.css';

export default class SignUpBody extends React.Component {
    getValidator = () => {
        return useState(false);
    }
    constructor(){
        super();
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            isValidated: false
        }
    }
    onSubmitSignUpInfoHandler = async (event) =>{
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // else {
            
        // }
        // this.setValidated(true);
        await Axios.post("http://localhost:8080/api/v1/signup",{
                    userName: this.state.userName,
                    password: this.state.password,
                }).then(r => {
                    if(r.status == 201){
                        alert('Account has been created successfully.');
                    }
                    else{
                        alert('Created failed please try again..');
                    }
                }).catch(e => console.log(e))
    }
    validatePassword = () => {
        return this.state.confirmPassword == this.state.password
    }
    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    setValidated = (state) => {
        this.setState({isValidated: state});
    }
    render(){
        return (
            <Modal.Body>
                <Form noValidate validated={this.state.isValidated}>
                    <Form.Label>
                        Please provide your information.
                    </Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required name="userName" type="text" placeholder="Enter username" value={this.state.userName} onChange={this.onChangeHandler}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChangeHandler}/>
                        <small>use atleast one character and number for security</small>
                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control required name="confirmPassword" type="password" placeholder="Password" value={this.state.confirmPassword} onChange={this.onChangeHandler}/>
                    </Form.Group>
                    <Button type="button" variant="primary" className="sign-option-btn float-right" onClick={this.onSubmitSignUpInfoHandler}>
                        Sign up
                    </Button>
                </Form>
            </Modal.Body>
        )
    }
}