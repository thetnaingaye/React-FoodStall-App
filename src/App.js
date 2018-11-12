import React, { Component } from 'react';
import './App.css';
import Order from './Orders';
import CreateOrder from './CreateOrder';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import OrdersGrid from './OrdersGrid';
import OrdersAntTable from './OrdersAntTable';
import { observer, inject } from 'mobx-react';
import Login from './Login';

@withRouter
@inject("orderStore")
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: []
    }
  }

  createOrderHanlder = (order) => {
    const neworders = this.state.orders;
    order = { ...order, orderid: this.state.orders.length + 1 }
    console.log(order);
    neworders.push(order);
    this.setState({
      orders: neworders
    });
    localStorage.setItem('myOrders', JSON.stringify(neworders));
    this.props.orderStore.addOrder(order);
  }

  deleteOrderHandler = (id) => {
    var order = this.state.orders.find(function (o) {
      return o.orderid === id;
    });
    console.log(order);
    const newOrders = this.state.orders;
    newOrders.splice(newOrders.indexOf(order), 1);
    console.log(newOrders);
    this.setState({
      orders: newOrders
    });
    localStorage.setItem('myOrders', JSON.stringify(newOrders));
    this.props.orderStore.removeOrder(order);
  }


  componentDidMount() {
    const localOrders = JSON.parse(localStorage.getItem('myOrders'));
    if (localOrders) {
      console.log("Orders from Local Storage : " + JSON.stringify(localOrders));
      this.setState({
        orders: localOrders
      })
    }
  }

  componentDidUpdate() {
    console.log("MobX orders: " + JSON.stringify(this.props.orderStore.orders))
  }


  getOrders() {
    if (this.state.orders) {
      return this.state.orders
    } else {
      const localOrders = JSON.parse(localStorage.getItem('myOrders'));
      if (localOrders) {
        console.log("Orders from Local Storage : " + JSON.stringify(localOrders));
        this.setState({
          orders: localOrders
        })
      }

    }
  }

  logoutHandler = () => {
    this.props.orderStore.isAuthenticated = false;
  }

  render() {

    const logoutButton = (<button className="btn btn-default" onClick={this.logoutHandler}><span className="glyphicon glyphicon-log-out"></span> Log out</button>)
    const main = (
      <div className="row row-offcanvas row-offcanvas-left">
        <div className="col-md-2 sidebar-offcanvas">
          <Navbar />
        </div>
        <div className="col-md-9">
          <br />
          <div className="jumbotron">

            <Switch>
              <Route path="/checkout" render={() => <Order orders={this.state.orders} deleteOrder={this.deleteOrderHandler} />} exact />
              <Route path="/" render={() => <CreateOrder createOrder={this.createOrderHanlder} />} exact />
              <Route path="/summary/grid" render={() => <OrdersGrid orders={this.state.orders} />} exact />
              <Route path="/summary/anttable" render={() => <OrdersAntTable orders={this.state.orders} />} exact />

            </Switch>


          </div>
        </div>
       
      </div>
    )

    const body = this.props.orderStore.isAuthenticated ? main : <Login />
    
    return (
      <div className="App">

        <nav className="navbar navbar-default">
          Your Express Foodstall
         <ul className="nav navbar-nav navbar-right" style={{marginRight:"20px"}}>
            <li>
            {this.props.orderStore.isAuthenticated && logoutButton}
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          {body}
        </div>


      </div>


    );
  }
}

export default App;
