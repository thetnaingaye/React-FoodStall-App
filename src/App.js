import React, { Component } from 'react';
import './App.css';
import Order from './Orders';
import CreateOrder from './CreateOrder';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state= {
      orders: []
    }
  }

  createOrderHanlder = (order) => {
    const neworders = this.state.orders;
    order = {...order,orderid : this.state.orders.length+1}
    console.log(order);
    neworders.push(order);
    this.setState({
      orders : neworders
    });
  }

  deleteOrderHandler = (id) => {
    var order = this.state.orders.find(function(o) { 
      return o.orderid === id; 
    });
    console.log(order);
    const newOrders = this.state.orders;
    newOrders.splice( newOrders.indexOf(order), 1 );
    console.log(newOrders);
    this.setState({
      orders : newOrders
    })
  }

  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-default App-header">
          Your Express Foodstall
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
                  <Route path="/summary" render={() => <Order orders={this.state.orders} deleteOrder={this.deleteOrderHandler}/>} exact />
                  <Route path="/" render={() => <CreateOrder createOrder={this.createOrderHanlder}/> } exact />
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
