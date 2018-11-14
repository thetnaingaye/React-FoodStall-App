import { Table, Tag } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import ReactLoading from 'react-loading';
import Auth from '@aws-amplify/auth';
import { Storage } from 'aws-amplify';




const columns = [
    {
        title: 'Customer',
        dataIndex: 'customer',
        width: 200,
        fixed: 'left',
        sorter: (a, b) => { return a.customer.localeCompare(b.customer) },
    },
    {
        title: 'Food',
        dataIndex: 'food',
        filters: [{
            text: 'Chicken Rice',
            value: 'Chicken Rice',
        },
        {
            text: 'Fish and Chips',
            value: 'Fish and Chips',
        }, {
            text: 'Dumpling Noodles',
            value: 'Dumpling Noodles',
        }, {
            text: 'Nasi Lemak',
            value: 'Nasi Lemak',
        }, {
            text: 'Fried Bee Hoon',
            value: 'Fried Bee Hoon',
        }],
        filterMultiple: true,
        onFilter: (value, record) => record.food.indexOf(value) === 0,
    }, {
        title: 'Size',
        dataIndex: 'size',

    }, {
        title: 'Toppings',
        dataIndex: 'toppings',
        render: toppings => (
            <span>
                {toppings && toppings.map(tag => <Tag color="peru" key={tag}>{tag}</Tag>)}
            </span>
        )

    },
    {
        title: 'Status',
        dataIndex: 'status',
        fixed: 'right'
    }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class OrdersAntTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true,
            selectedOrderId: "",
        }
    }

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

    componentDidMount() {
        fetch('https://t9tkzjene1.execute-api.us-east-1.amazonaws.com/prod/foodstall/orders/user?user=' + Auth.user.username)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    orders: data,
                    loading: false
                })
            });
    }
    onRowClick(record, index, event) {

        console.log(record)
        this.setState(
            {
                selectedOrderId: record.id,
                invoice: <label>checking invoice...  <ReactLoading type="bubbles" color="blue" height={50} width={50} /></label>,
            }
        )

        this.getInvoice(record.id);
    }
    getInvoice = (id) => {

        this.setState(
            {
                getInvoice: true
            }
        )
        Storage.get(`${id}.pdf`)
            .then(result => {
                console.log("get pdf:" + result)

                fetch(result)
                    .then(res => {
                        console.log(res.status)
                        if (res.status !== 404) {
                            this.setState({
                                pdfUrl: result,
                                invoice: <a className="btn btn-success" href={result} target="_blank">Download invoice</a>
                            })
                        } else {
                            this.setState({
                                pdfUrl: "not found",
                                invoice: <label style={{ color: "red" }}>No Invoice Found!</label>
                            })
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));

    }

    render() {


        return (
            <div>
                <div className="jumbotron">
                    {this.state.loading && <div><p>Getting orders...</p>
                        <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                    </div>}
                    {!this.state.loading &&
                        <div>
                            <Table onRow={(record, index) => ({
                                onClick: (event) => { this.onRowClick(record, index, event) }
                            })} columns={columns} dataSource={this.state.orders} onChange={this.onChange} pagination={{ pageSize: 5 }} scroll={{ x: 1500 }} />

                        </div>
                    }
                </div>
                <div className="jumbotron" style={this.state.selectedOrderId ? {} : { display: 'none' }}>
                    <div>
                        <div><label>selected order id:<a>{this.state.selectedOrderId}</a></label></div>
                        {this.state.invoice}
                    </div>
                </div>
            </div>)
    }
}

export default OrdersAntTable;