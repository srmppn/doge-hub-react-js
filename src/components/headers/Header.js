import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Col } from 'react-bootstrap';
import SignInModal from '../modals/SignInModal';
import Axios from 'axios';
import DogePic from '../../assets/doge.png';
import fire from '../../assets/fire.png';
import './Header.css';
import Http from '../../http/HttpService';

export default class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            accountName: '',
            nuggerPoint: 0,
            profileImageName: '',
            profileImage: null,
            currentStatus: 'guest',
            showModal: false
        }
    }
    componentDidMount(){
        Http.get("profile")
            .then(r => {
                this.setState({
                                currentStatus: 'user', 
                                accountName:r.data.userName, 
                                nuggerPoint:r.data.nuggerPoint, 
                                profileImageName: r.data.profileImage
                            }); 
            })
            .catch(e => console.log(e));
    }
    getProfileImage = () => {
    }
    renderAccountName = (name) => {
        if(name.length > 7){
            return name.substring(0,5) + '..';
        }
        return name;
    }
    renderProfileImage = () => {
        return this.state.profileImageName === null ? 
                    DogePic : ( process.env.REACT_APP_API_PATH + "images/" +  this.state.profileImageName)
    }
    onClickLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    hasLogin(){
        if(this.state.currentStatus === 'guest'){
            return <Button variant="warning" className="ml-2" onClick={this.onClickShowModal}>Sign in</Button>;
        }
        else{
            return (<NavDropdown title={
                                    <span>
                                        <img className="profile-pic" src={this.renderProfileImage()} />
                                        <span className="account-name">{this.renderAccountName(this.state.accountName)}</span>
                                    </span>
                            } id="basic-nav-dropdown">
                        <NavDropdown.Item href="/channel">Channel</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Nugger point <span>{this.state.nuggerPoint}</span></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Get more nugger</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Subscriber</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" onClick={this.onClickLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>);
        }
    }
    onClickShowModal = () => {
        this.setState({showModal: true});
    }
    onHandleCloseModal = () => {
        this.setState({showModal: false});
    }
    render(){
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/">
                    <span className="home-text">
                        Doge
                    </span>
                    <span className="sub-home-text">
                        hub
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="#home" variant="light">HOT</Nav.Link>
                    <Nav.Link href="#features">MOST VIEWED</Nav.Link>
                    <Nav.Link href="#pricing">CATEGORIES</Nav.Link>
                    <Nav.Link href="#pricing">NEWS</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-warning">Search</Button>
                </Form>
                {this.hasLogin()}
                <SignInModal show={this.state.showModal} handleClose={this.onHandleCloseModal}/>
            </Navbar>
        );
    }
}
