import ReactDataGrid from 'react-data-grid';
import React from 'react';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class OrdersGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'customer', name: 'Customer', filterable: true, locked: true },
      { key: 'food', name: 'Food', filterable: true,width:200 },
      { key: 'size', name: 'Size' },
      { key: 'salt', name: 'More Salt' },
      { key: 'chilli', name: 'More Salt' },
      { key: 'pepper', name: 'More Pepper' },

    ];

    this.state = {
      orders: this.props.orders,
      rows: this.createRows(),
      filters: {}
    };

  }

  getOrders() {
    const localOrders = JSON.parse(localStorage.getItem('myOrders'));
    if (localOrders) {
      console.log("Orders from Local Storage : " + JSON.stringify(localOrders));
     
      return localOrders
    } else {
      return null;
    }
  }

  createRows = () => {
    let rows = [];
    const orders =this.getOrders();
    orders.map(od => {

      rows.push({
        customer: od.customerName,
        food: od.food,
        size: od.size,
        salt: od.toppings.indexOf('More Salt') >= 0 ? "Yes" : "No",
        chilli: od.toppings.indexOf('More Chilli') >= 0 ? "Yes" : "No",
        pepper: od.toppings.indexOf('More Pepper') >= 0 ? "Yes" : "No"
      });
    })

    return rows;
  };

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    let rows = this.getRows();
    return rows[rowIdx];
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    // all filters removed
    this.setState({ filters: {} });
  };

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          enableCellSelect={true}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} 
          />
      </div>);
  }
}

export default OrdersGrid;