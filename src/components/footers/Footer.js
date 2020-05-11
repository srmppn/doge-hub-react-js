import React from 'react';
import './Footer.css'

export default class Footer extends React.Component {
    render(){
        return(
            <footer className="footer-container">
                <div>
                    <h5>Donate</h5>
                    <hr />
                    <span className="about-us">
                        <a href="#">Bitcoin</a>, <a href="#">Dogecoin</a>, <a href="#">True wallet</a>
                    </span>
                </div>
                <div>
                    <h5>About us</h5>
                    <hr />
                    <span className="about-us">
                        Dogehub is not a pornsite. it's just a funny doge vid site bruh
                    </span>
                </div>
                <div>
                    <h5>Contact us</h5>
                    <hr />
                    <span className="about-us">
                        <a href="#">Line</a>, <a href="#">Facebook</a>, <a href="#">Twitter</a>
                    </span>
                </div>
            </footer>
        )
    }
}