import React, { Component } from 'react';
import Customer from './Order/Form/Customer';
import Food from './Order/Form/Food';
import Size from './Order/Form/Size';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: "",
            customererror: "",
            password: "",
            passworderror: "",
            passwordconfirm: "",
            passwordconfirmerror: "",
            isFormSuccess: false
        }
    }

    nameInputHandler = (e) => {
        this.setState({
            customer : e.target.value,
            customererror : ""
        });
    };

    render() {
        const form = (
            <div>

                <form onSubmit={this.formHandler} >
                    <Customer name={this.state.customer} error={this.state.customererror} nameInputHandler={this.nameInputHandler} />
                    <Food />
                    <Size />
                    <button className="btn btn-success btn-lg">Order</button>
                </form>
            </div>
        )

        return (
            <div className="myForm">
                <div className="page-header">
                    <h3>New Order</h3>
                </div>
                {!this.state.isFormSuccess ? form : <h3>Form Submission Successful</h3>}
            </div>
        );
    }
}

export default CreateOrder;