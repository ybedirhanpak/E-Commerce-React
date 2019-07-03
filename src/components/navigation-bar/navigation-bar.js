import React, {Component} from 'react';

export default class NavigationBar extends Component {
    render() {
        return (
            <nav id="navigation">
            <div className="container">
              <div id="responsive-nav">
                <ul className="main-nav nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#">Hot Deals</a></li>
                  <li><a href="#">Categories</a></li>
                  <li><a href="#">Laptops</a></li>
                  <li><a href="#">Smartphones</a></li>
                  <li><a href="#">Cameras</a></li>
                  <li><a href="#">Accessories</a></li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}