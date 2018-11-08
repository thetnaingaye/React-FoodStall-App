import { Pagination,Table,Tag } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

const columns = [{
    title: 'Customer',
    dataIndex: 'customerName',
    width:200,
    fixed: 'left',
    sorter: (a, b) => { return a.customerName.localeCompare(b.customerName)},
}, {
    title: 'Food',
    dataIndex: 'food',
    filters: [{
        text: 'Chicken Rice',
        value: 'Chicken Rice',
    },
    ,{
        text: 'Fish and Chips',
        value: 'Fish and Chips',
    }, {
        text: 'Dumpling Noodles',
        value: 'Dumpling Noodles',
    },{
        text: 'Nasi Lemak',
        value: 'Nasi Lemak',
    }],
    filterMultiple: true,
    onFilter: (value, record) => record.food.indexOf(value) === 0,
},{
    title: 'Size',
    dataIndex: 'size',
  
} ,{
    title: 'Toppings',
    dataIndex: 'toppings',
    render: toppings => (
        <span>
          {toppings.map(tag => <Tag color="peru" key={tag}>{tag}</Tag>)}
        </span>
      )

}];


class OrdersAntTable extends Component {

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

    render() {
        return (<div>
            <Table columns={columns} dataSource={this.props.orders} onChange={this.onChange} pagination={{ pageSize: 5}} scroll={{ x: 1300 }}/>
            </div>)
    }
}

export default OrdersAntTable;