import React, { Component } from 'react';
import OrdersAntTable from './OrdersAntTable';
class Order extends Component {

    render() {

        const ordertable = (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <td>Customer Name</td>
                            <td>Food</td>
                            <td>Size</td>
                            <td>Toppings</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(od => {
                            return (<tr key={od.orderid}>
                                <td>{od.customerName}</td>
                                <td>{od.food}</td>
                                <td>{od.size}</td>
                                <td>{od.toppings && od.toppings.map((t,index) => { return <div key={index}>{t}</div>})}</td>
                                <td><button className="btn btn-danger" style={{ backgroundColor: "#FF5733"}} onClick={() => { this.props.deleteOrder(od.orderid) }} >Delete</button></td>
                            </tr>);

                        })}
                    </tbody>
                </table>
            </div>
        );

        return (
            <div>
                <div className="page-header">
                    <h3>Order Summary</h3>
                </div>
                {this.props.orders.length>0 ? ordertable : <h4 style={{color:"red"}}>Currently, there is no order. Please click on new order to start ordering.</h4>}
            </div>
        );
    }
}

export default Order;