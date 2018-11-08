import ReactDataGrid from 'react-data-grid';
import React from 'react';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons'); 

class OrdersGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'customer', name: 'Customer',filterable: true },
      { key: 'food', name: 'Food',filterable:true },
      { key: 'size', name: 'Size' },
      { key: 'toppings', name: 'Toppings' }
    ];

    this.state = { rows: this.createRows(), filters: {} };
  }

  createRows = () => {
    let rows = [];
    this.props.orders.map(od => {
      const tp = od.toppings.join(', ');
      rows.push({
        customer: od.customerName,
        food: od.food,
        size: od.size,
        toppings : tp
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
    this.setState({filters: {} });
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
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters} />
      </div>);
  }
}

export default OrdersGrid;