import React, { Component } from 'react';
import Customer from './Order/Form/Customer';
import Food from './Order/Form/Food';
import Size from './Order/Form/Size';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: "",
            customererror: "",
            food: "",
            fooderror: "",
            size: "",
            sizeerror: "",
            isFormSuccess: false
        }
    }

    nameInputHandler = (e) => {
        this.setState({
            customer: e.target.value,
            customererror: "",
            isFormSuccess: false
        });
    };

    foodInputHandler = (e) => {
        this.setState({
            food: e.target.value,
            foodrerror: "",
            isFormSuccess: false
        });
    };

    sizeInputHandler = (e) => {
        this.setState({
            size: e.target.value,
            sizeerror: "",
            isFormSuccess: false
        });
    }

    orderHandler = (e) => {
        e.preventDefault();
        const order = {
            customerName: this.state.customer,
            food: this.state.food,
            size: this.state.size
        }
        console.log(order);
        this.props.createOrder(order);
        this.setState({
            isFormSuccess: true
        })


    }

    resetForm = () => {
        NotificationManager.success(`You have ordered ${this.state.size} ${this.state.food} successfully`, `Hi, ${this.state.customer}`,5000)
        this.setState({

            customer: "",
            customererror: "",
            food: "",
            fooderror: "",
            size: "",
            sizeerror: "",
            isFormSuccess: false
        })
    }

    render() {
        const form = (
            <div>

                <form onSubmit={this.formHandler} >
                    <Customer name={this.state.customer} error={this.state.customererror} nameInputHandler={this.nameInputHandler} />
                    <Food name={this.state.food} error={this.state.fooderror} foodInputHandler={this.foodInputHandler} />
                    <Size name={this.state.size} sizeInputHandler={this.sizeInputHandler} />
                    <button className="btn btn-success btn-lg" onClick={this.orderHandler} disabled={!(this.state.customer && this.state.food  && this.state.size)} >Order</button>
                </form>
            </div>
        )

        return (
            <div className="myForm">
                <div className="page-header">
                    <h3>New Order</h3>
                </div>
                {form}
                {this.state.isFormSuccess && this.resetForm()}
                <NotificationContainer/>
            </div>
        );
    }
}

export default CreateOrder;