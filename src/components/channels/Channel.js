import React from 'react';
import { Form, Tabs, Tab, Jumbotron, Container, Button } from 'react-bootstrap';
import UploadModal from '../modals/UploadModal';
import Http from '../../http/HttpService';
import Home from '../home-components/Home';
import Doge from '../../assets/doge.png'
import Nugger from '../../assets/nugger.png'
import './Channel.css'

export default class Channel extends React.Component {
    constructor(){
        super();
        this.state = {
            accountName: '',
            nuggerPoint: 0,
            profileImageName: '',
            showUpload: false,
            isEditDesc: false
        }
    }
    componentDidMount(){
        Http.get("profile").then(r => {
                this.setState({accountName:r.data.userName, nuggerPoint:r.data.nuggerPoint, profileImageName: r.data.profileImage}); 
            }).catch(e => console.log(e));
    }
    onCloseHandler = () => {
        this.setState({showUpload: false});
    }
    onShowHandler = () => {
        this.setState({showUpload: true});
    }
    onClickEditDescript = () => {
        this.setState({isEditDesc: true});
    }
    render() {
        return (
                <Jumbotron className="custom-jumbotron" fluid>
                    <Container>
                        <div className="profile-image-container">
                            <img className="profile-image" src={ this.state.profileImageName === null ? Doge : "http://localhost:8080/api/v1/images/" + this.state.profileImageName }/>                          
                            <span variant="warning" className="change-image-btn" onClick={this.onShowHandler}>change</span>
                        </div>
                        <div className="information-container">
                        <div className="user-name-header">{this.state.accountName}</div>
                            <div className="channel-description">
                                { 
                                    this.state.isEditDesc ? 
                                    <Form.Control className="description-edit-form" as="textarea" rows="2" />
                                    : <>
                                        Channel description
                                        <span onClick={this.onClickEditDescript}>
                                            edit
                                        </span>
                                    </>
                                }
                            </div>
                        </div>
                        <Tabs>
                            <Tab tabClassName="tab-item" eventKey="profile" title="Profile">
                                <div className="profile-container">
                                    <div>Username : {this.state.accountName}</div>
                                    <div>
                                        Current nugger point : {this.state.nuggerPoint}
                                        <img className="nugger-point-img" src={Nugger} width="30"/>
                                        <small><a href="#">get more nugger?</a></small>
                                    </div>
                                    <div>Subcriber : 10K</div>
                                </div>
                            </Tab>
                            <Tab tabClassName="tab-item" eventKey="home" title="Videos">
                                <Home />
                            </Tab>
                            <Tab tabClassName="tab-item" eventKey="contact" title="Contact">
                                <div className="contact-container">
                                    <span>Add your contact information</span>
                                </div>
                            </Tab>
                        </Tabs>
                    </Container>
                    <UploadModal show={this.state.showUpload} handleClose={this.onCloseHandler}/>
                </Jumbotron>
        );
    }
}