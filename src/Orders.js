import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router'
  

@inject('orderStore')
@observer
class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            status : " ",
          
        }
    }

    submitOrder = () => {
        this.setState({
            submitting: true
        })
        const payload = {
            orders: this.props.orderStore.orders
        }
        fetch('https://t9tkzjene1.execute-api.us-east-1.amazonaws.com/prod/foodstall/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {
                this.props.orderStore.orders = [];
                console.log(res);
                this.setState({
                    submitting: false,
                    isProcessd : true
                    
                })
                setTimeout(() => { this.props.history.push('/Summary/anttable') }, 5000);
                
            });
    }

    render() {


        const ordertable = (


            <div>
                {this.state.submitting && <div><p>Processing orders...</p>
                   <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                </div>}
                {!this.state.submitting &&
                    <div>
                        <button onClick={this.submitOrder} className="btn btn-danger" >Sumit Orders</button>
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
                                    {this.props.orderStore.orders.map(od => {
                                        return (<tr key={od.orderid}>
                                            <td>{od.customer}</td>
                                            <td>{od.food}</td>
                                            <td>{od.size}</td>
                                            <td>{od.toppings && od.toppings.map((t, index) => { return <div key={index}>{t}</div> })}</td>
                                            <td><button className="btn btn-danger" style={{ backgroundColor: "#FF5733" }} onClick={() => { this.props.deleteOrder(od.orderid) }} >Delete</button></td>
                                        </tr>);

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}

            </div>
        );

        return (
            <div>
                <div className="page-header">
                    <h3>Orders</h3>
                </div>
                {this.state.isProcessd && <h4 style={{ color: "green" }}>Orders are being processed. Going to Orders Summary Page...</h4> }
                {this.props.orderStore.orders.length > 0  &&  ordertable }
                {this.props.orderStore.orders.length === 0 && !this.state.isProcessd  &&  <h4 style={{ color: "red" }}>Currently, there is no order. Please click on new order to start ordering.</h4>}
            </div>
        );
    }
}

export default withRouter(Order);