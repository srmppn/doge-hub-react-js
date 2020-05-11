import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class SignInBody extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            isValidated: false,
            isSignInFail: false
        }
    }
    onSubmit = () => {
        var credentials = btoa(this.state.username+':'+this.state.password);
        Axios.post("http://localhost:8080/api/v1/signin", {}, {
                headers: {
                Authorization: 'Basic ' + credentials
                }
           })
           .then(r => {
               if(r.status==200){
                    localStorage.setItem("token", r.headers.authorization.substring(7));
                    this.setState({isSignInFail: false});
                    window.location.reload();
               }
               else{
                   
               }
           })
           .catch(e => {
                this.setState({isValidated: true, isSignInFail: true});
           });
    }
    onChangeHandle = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.username)
    }
    render(){
        return(
            <Modal.Body>
                <Form noValidate validated={this.state.isValidated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required name="username" type="text" placeholder="Enter username" value={this.state.username} onChange={this.onChangeHandle}/>
                        <Form.Control.Feedback type="invalid">
                            Please, provide username
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChangeHandle}/>
                        <Form.Control.Feedback type="invalid" >
                            Please, provide password
                        </Form.Control.Feedback>
                    </Form.Group>
                    { 
                        this.state.isValidated && this.state.isSignInFail ?
                            <span className="text-danger">Invalid username or password, please try again</span>
                            : null
                    }
                    <Button className="sign-option-btn float-right" onClick={this.onSubmit}>
                        Sign in
                    </Button>
                </Form>
            </Modal.Body>
        )
    }
}