import React, { Component } from 'react';
import Customer from './Order/Form/Customer';
import Food from './Order/Form/Food';
import Size from './Order/Form/Size';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailerror: "",
            password: "",
            passworderror: "",
            passwordconfirm: "",
            passwordconfirmerror: "",
            isFormSuccess: false
        }
    }

    render() {
        const form = (
            <div>

                <form onSubmit={this.formHandler} >


                    <button className="btn btn-success btn-lg">Order</button>
                </form>
            </div>
        )

        return (
            <div className="myForm">
                <div className="page-header">
                    <h3>New Order</h3>
                </div>
                <Customer />
                <Food />
                <Size />
                {!this.state.isFormSuccess ? form : <h3>Form Submission Successful</h3>}
            </div>
        );
    }
}

export default CreateOrder;