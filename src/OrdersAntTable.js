import { Table, Tag } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import ReactLoading from 'react-loading';

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
    }];


class OrdersAntTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true,
        }
    }

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

    componentDidMount() {
        fetch('https://t9tkzjene1.execute-api.us-east-1.amazonaws.com/prod/foodstall/orders?id=*')
            .then(response => response.json())
            .then(data => {

                this.setState({
                    orders: data,
                    loading: false
                })
            });
    }

    render() {
        return (
            <div>
                {this.state.loading && <div><p>Getting orders...</p>
                    <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                </div>}
                {!this.state.loading &&
                    <div>
                        <Table columns={columns} dataSource={this.state.orders} onChange={this.onChange} pagination={{ pageSize: 5 }} scroll={{ x: 1500 }} />
                    </div>
                }
            </div>)
    }
}

export default OrdersAntTable;