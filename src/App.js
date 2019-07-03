import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Alert from 'react-bootstrap/Alert';

//Components
import SlideProduct from './components/slide-product/slide-product';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="row header-row">
            <div className="col-3 banner">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="col-6"></div>
            <div className="col-3 sign-in">
              {/* Sign in Component */}
            </div>
          </div>
        </header>
        <body className="App-body">
          <div className="container-fluid App-container">
            {/* Navbar Row */}
            <div className="row navbar-row">
              <div className="col">{/* Empty Col */}</div>
              <div className="col-10 navbar-col">
                {/* Navbar Component */}
              </div>
              <div className="col"></div>
            </div>
            {/* Filter and Products Row */}
            <div className="row">
              <div className="col"></div>
              <div className="col-2 filter">
                {/* Filter Component */}
              </div>

              <div className="col-8 result-products">
                <div className="row">
                  <div className="col sort">
                    {/* Sort Component */}
                  </div>
                </div>
                <div className="row">
                  <div className="col products">
                    {/* Product Components */}
                  </div>
                </div>
              </div>
              <div className="col">{/* Empty Col */}</div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

