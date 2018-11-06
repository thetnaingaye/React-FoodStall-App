import React, { Component } from 'react';
import './App.css';
import Order from './Orders';
import CreateOrder from './CreateOrder';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-default App-header">
              FoodStall Express
        </nav>

        <div className="container-fluid ">

          <div className="row row-offcanvas row-offcanvas-left">
            <div className="col-md-2 sidebar-offcanvas">
              <Navbar />
            </div>
            <div className="col-md-10">
              <br />
              <div className="jumbotron">
                <Switch>
                  <Route path="/summary" component={Order} exact />
                  <Route path="/" component={CreateOrder} exact />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default App;
