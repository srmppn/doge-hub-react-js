import React from 'react';
import VideoPlayer from '../player/VideoPlayer';
import Shibe1 from '../../assets/shibe1.jpg';
import Nasty from '../../assets/drunk-shibe.jpg';
import Sleep from '../../assets/sleep.png';
import samoid from '../../assets/samoid.jpg';
import gogo from '../../assets/gogo.jpg';
import './Home.css';

export default class Home extends React.Component {
    
    renderingVideoContents = () => {
        let vPlayer = []
        for(let i=0;i<this.state.videos.length;i++){
        vPlayer.push(<VideoPlayer thumbnail={Shibe1} title={this.state.videos[i].title} duration={this.state.videos[i].duration} views="2.7k"/>)
        }
        return vPlayer;
    }
    render() {
        return (
            <div className="content-container">
                <VideoPlayer thumbnail={Shibe1} title="Shibe was raped by dirty human" duration="10:30" views="2.7k"/>
                <VideoPlayer thumbnail={Sleep} title="This shiba on film while sleeping" duration="5:10" views="5.2k"/>
                <VideoPlayer thumbnail={gogo} title="Shibe chasing his balls" duration="12:10" views="7k"/>
                <VideoPlayer thumbnail={samoid} title="3 Shibes 1 Samoid." duration="1:59:20" views="4.4k"/>
                <VideoPlayer title="Fake shibe"/>
                <VideoPlayer title="Creampie on poor shibe"/>
                <VideoPlayer title="Amature shibe so confused"/>
            </div>
        );
    }
}