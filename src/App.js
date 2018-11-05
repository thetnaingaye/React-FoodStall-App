import React, { Component } from 'react';
import './App.css';
import Order from './Orders';
import CreateOrder from './CreateOrder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <div classNameName="container">

        <nav class="navbar navbar-default navbar-fixed-top App-header">
              FoodStall Express
        </nav>

        <div className="App container-fluid">

          <div className="row row-offcanvas row-offcanvas-left">
            <div className="col-md-2 sidebar-offcanvas" id="sidebar"
              role="navigation">
              <div className="sidebar-nav">
                <ul className="nav">
                  <li className="nav-divider"></li>
                  <li>

                    <NavLink to='/' className="btn btn-danger btn-lg" >NEW ORDER</NavLink>

                  </li>
                  <li className="nav-divider"></li>
                  <li>
                  <NavLink to='/Summary' className="btn btn-info btn-lg" >ORDER SUMMARY</NavLink>
                  </li>
                  <li className="nav-divider"></li>
                </ul>
              </div>
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
