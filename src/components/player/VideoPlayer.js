import React from 'react';
import DogeVid from '../../assets/doggo.mp4';
import DogeThumb from '../../assets/gorge.webp'
import DogePic from '../../assets/doge.png';
import './VideoPlayer.css';

class VideoPlayer extends React.Component {
    constructor(){
        super();
        this.state = {
            isThumbnailClicked : false
        }
    }
    showsContent(){
        return this.isThumbnailClicked ? 
            <video width="320" height="240" src={DogeVid} controls /> :
            <>
                <img className="video-thumb-nail" src={this.props.thumbnail} width="267" height="150"/>
                <span className="duration-label">{this.props.duration}</span>
            </>
    }
    render(){
        return(
            <div className="main-player">
                <div className="video-content">
                    {this.showsContent()}
                </div>
                <div className="video-info">
                    <img className="user-icon" src={DogePic}/>
                    <div className="details-container">
                        <span className="title">{this.props.title}</span>
                        <span className="views-and-wow">{this.props.views} views</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;