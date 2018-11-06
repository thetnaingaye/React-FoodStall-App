import React, { Component } from 'react';
import Customer from './Order/Form/Customer';
import Food from './Order/Form/Food';
import Size from './Order/Form/Size';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: "",
            customererror: "",
            food: "",
            fooderror: "",
            size: "Small",
            sizeerror: "",
            isFormSuccess: false,
            foodList: [
                'Chicken Rice', 'Fish and Chips', 'Dumpling Noddles', 'Nasi Lemak'
            ]
        }
    }

    nameInputHandler = (e) => {
        this.setState({
            customer: e.target.value,
            customererror: "",
            isFormSuccess: false
        });
    };

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

        this.resetForm();
    }

    foodDropDownHandler = (opt) => {
        console.log(opt.value);
        this.setState({
            food: opt.value,
            foodrerror: "",
            isFormSuccess: false
        });
    }

    radioSizeHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            size: e.target.value,
            sizeerror: "",
            isFormSuccess: false
        });
    }
    resetForm = () => {
        NotificationManager.success(`You have ordered ${this.state.size} size ${this.state.food} successfully`, `Hi, ${this.state.customer}`, 3000)
        this.setState({

            customer: "",
            customererror: "",
            food: "",
            fooderror: "",
            size: "Small",
            sizeerror: "",
            isFormSuccess: false
        })
    }

    render() {
        const form = (
            <div>

                <form onSubmit={this.formHandler} >
                    <Customer name={this.state.customer} error={this.state.customererror} nameInputHandler={this.nameInputHandler} />
                    <Food foodList={this.state.foodList} food={this.state.food} error={this.state.fooderror} foodInputHandler={this.foodDropDownHandler} />
                    <Size size={this.state.size} sizeChanged={this.radioSizeHandler} />
                    <br />
                    <button className="btn btn-success btn-lg" onClick={this.orderHandler} disabled={!(this.state.customer && this.state.food && this.state.size)} >Order</button>
                </form>

        
            </div>
        )

        return (
            <div className="myForm">
                <div className="page-header">
                    <h2>Let's eat !</h2>
                </div>
                {form}
                <NotificationContainer />
            </div>
        );
    }
}

export default CreateOrder;