import React, { Component } from 'react';
import Customer from './Order/Form/Customer';
import Food from './Order/Form/Food';
import Size from './Order/Form/Size';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Select from 'react-select';
import Auth from '@aws-amplify/auth';




const toppings = [
    { value: 'More Chilli', label: 'More Chilli' },
    { value: 'More Pepper', label: 'More Pepper' },
    { value: 'More Salt', label: 'More Salt' }
];


class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: Auth.user.username,
            customererror: "",
            food: "",
            fooderror: "",
            size: "Small",
            sizeerror: "",
            isFormSuccess: false,
            foodList: [
               
            ],
            selectedTopping: null,

        }
    }
    componentDidMount() {
        fetch('https://66e64h2nef.execute-api.us-east-1.amazonaws.com/prod/myServerlessWebsite')
        .then(response => response.json())
        .then(data =>  {
            let fList =[]
            data.map(data => {
                return fList.push(data.foodName)
            });
            fList.sort();
            this.setState({ foodList:fList })
        });
    }

    handleChange = (selectedTopping) => {
        this.setState({ selectedTopping });
        console.log(`Option selected:`, selectedTopping);
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
        const toppings = this.state.selectedTopping? this.state.selectedTopping.map(t => t.value) : ""
        const order = {
            customer: this.state.customer,
            food: this.state.food,
            size: this.state.size,
            toppings : toppings? toppings : []
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
        NotificationManager.success(`Order ${this.state.size} size ${this.state.food} is added to cart`, `Customer : ${this.state.customer}`, 3000)
        this.setState({

            customer: "",
            customererror: "",
            food: "",
            fooderror: "",
            size: "Small",
            sizeerror: "",
            selectedTopping: null,
            isFormSuccess: false
        })
    }

    render() {
        const { selectedTopping } = this.state;
        const form = (
            <div>

                <form onSubmit={this.formHandler} >
                    <Customer name={this.state.customer} error={this.state.customererror} nameInputHandler={this.nameInputHandler} />
                    <Food foodList={this.state.foodList} food={this.state.food} error={this.state.fooderror} foodInputHandler={this.foodDropDownHandler} />

                    <label>Toppings:</label>
                    <Select
                        value={selectedTopping}
                        onChange={this.handleChange}
                        options={toppings}
                        isMulti
                    />
                    <br />
                    <Size size={this.state.size} sizeChanged={this.radioSizeHandler} />

                    <br />
                    <button className="btn btn-success btn-lg" onClick={this.orderHandler} disabled={!(this.state.customer && this.state.food && this.state.size)} >Add Order</button>
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