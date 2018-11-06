import React, { Component } from 'react';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [
                {
                    orderid : "001",
                    customerName: "Naing",
                    food: "chicken rice",
                    size: "medium"
                },
                {
                    orderid : "002",
                    customerName: "Alice",
                    food: "fishball noodle",
                    size: "small"
                },
                {
                    orderid : "003",
                    customerName: "Tony",
                    food: "fish-and-chip",
                    size: "large"
                }
            ]

        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h3>Order Summary</h3>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <td>Customer Name</td>
                                <td>Food</td>
                                <td>Size</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(od => {
                                return (<tr key={od.orderid}>
                                    <td>{od.customerName}</td>
                                    <td>{od.food}</td>
                                    <td>{od.size}</td>
                                    <td><button className="btn btn-danger">Cancel Order</button></td>
                                </tr>);

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Order;