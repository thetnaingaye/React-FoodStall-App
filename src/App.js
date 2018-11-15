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
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import aws_exports from './aws-exports';
import Header from './Header';
import decode from 'jwt-decode';
import { Authenticator } from 'aws-amplify-react/dist/Auth';
import ManageInvoice from './ManageInvoice';


Amplify.configure(aws_exports);



@withRouter
@inject("orderStore")
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: []
    }

    this.props.orderStore.user = Auth.user.username;

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
    
    const { onStateChange } = this.props;
    Auth.signOut().then(() => {
             onStateChange('signedOut');
    });
  }


  render() {
    const accessToken = localStorage.getItem(`CognitoIdentityServiceProvider.648p7jra8h6ck576065ckg62hv.${Auth.user.username}.accessToken`)
    const decodedToken = decode(accessToken)
    const isOwner = decodedToken["cognito:groups"] ? decodedToken["cognito:groups"].includes('owner') : false;

    const main = (
      <div className="row row-offcanvas row-offcanvas-left">
        <div className="col-md-2 sidebar-offcanvas">
          <Navbar username={Auth.user.username}/>
        </div>
        <div className="col-md-9">
          <div>

            <Switch>
              <Route path="/checkout" render={() => <Order orders={this.state.orders} deleteOrder={this.deleteOrderHandler} />} exact />
              <Route path="/" render={() => <CreateOrder createOrder={this.createOrderHanlder} />} exact />
              {isOwner && <Route path="/manageinvoice" render={() => <ManageInvoice />} exact />}
              {isOwner && <Route path="/summary/grid" render={() => <OrdersGrid orders={this.state.orders} />} exact />}
              <Route path="/summary/anttable" render={() => <OrdersAntTable orders={this.state.orders} />} exact />

            </Switch>


          </div>
        </div>
       
      </div>
    )

    //const body = this.props.orderStore.isAuthenticated ? main : <Login />
    
    return (

      <div className="App">

        <Header logoutHandler={this.logoutHandler} isVisible={this.props.authState ==='signedIn'} username={Auth.user.username}/>
        <div className="container-fluid">
          {main}
        </div>
      </div>


    );
  }
}
export default withAuthenticator(App, false, [
  <Header/>,
  <SignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <ForgotPassword/>,
  <RequireNewPassword />
]);