import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import ReactLoading from 'react-loading';
import { observer, inject } from 'mobx-react';



@inject("orderStore")
@observer
class ManageInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getting: false,
            invoiceIds: []
        }
        this.getInvoices();

    }

    getInvoices = () => {
        Storage.list('')
            .then(result => {
                console.log("s3 list :" + JSON.stringify(result))
                const invoiceIds = []
                result.map(e => {
                    invoiceIds.push(e.key.slice(0, e.key.indexOf('.')))
                })
                this.setState({
                    invoiceIds: invoiceIds
                })
            })
            .catch(err => console.log(err));
    }

    deleteInvoice = (id) => {

        console.log(id);
        Storage.remove(`${id}.pdf`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    downloadInvoice = (id) => {
        // get file from S3
        Storage.get(`${id}.pdf`)
            .then(result => {
                fetch(result)
                    .then(res => {
                        console.log(res.status)
                        if (res.status !== 404) {

                            console.log("Got File from S3 :" + result)
                            window.open(result, "_blank");
                        } else {
                            alert("file not found")
                        }
                    })
                    .catch(err => console.log(err))


            })
            .catch(err => {
                alert("error in downloading:")
                console.log(err)
            });

    }

    render() {


        const invoiceTable = (


            <div>
                {this.state.getting && <div><p>Getting invoice...</p>
                    <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                </div>}
                {!this.state.getting &&
                    <div>
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
                                    {this.props.orderStore.ordersFromDb.map(od => {
                                        if (this.state.invoiceIds.includes(od.id)) {
                                            return (<tr key={od.orderid}>
                                                <td>{od.customer}</td>
                                                <td>{od.food}</td>
                                                <td>{od.size}</td>
                                                <td>{od.toppings && od.toppings.map((t, index) => { return <div key={index}>{t}</div> })}</td>
                                                <td><button className="btn btn-danger" style={{ backgroundColor: "#FF5733" }} onClick={() => { this.deleteInvoice(od.id) }} >Delete Invoice</button></td>
                                                <td><button className="btn btn-success" onClick={() => { this.downloadInvoice(od.id) }} >Download Invoice</button></td>

                                            </tr>);
                                        }


                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}

            </div>
        );

        return (
            <div className="jumbotron">
                <h2>Manage Invoices</h2>
                {invoiceTable}
            </div>
        );
    }
}

export default ManageInvoice;