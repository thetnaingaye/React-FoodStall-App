import ReactDataGrid from 'react-data-grid';
import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactLoading from 'react-loading';
import S3FileUpload from './S3FileUpload';
import { Storage } from 'aws-amplify';


const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');


@inject("orderStore")
@observer
class OrdersGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'customer', name: 'Customer', filterable: true, locked: true },
      { key: 'food', name: 'Food', filterable: true, width: 200 },
      { key: 'size', name: 'Size' },
      { key: 'salt', name: 'More Salt' },
      { key: 'chilli', name: 'More Chilli' },
      { key: 'pepper', name: 'More Pepper' },
      { key: 'status', name: 'Status' },

    ];

    this.state = {
      rows: [],
      filters: {},
      orders: [],
      loading: true,
    };

  }

  componentDidMount() {
    fetch('https://t9tkzjene1.execute-api.us-east-1.amazonaws.com/prod/foodstall/orders?id=*')
      .then(response => response.json())
      .then(data => {
        let rows = []
        const orders = data;
        this.props.orderStore.ordersFromDb = orders;
        if (orders) {
          orders.map(od => {

            return rows.push({
              orderid: od.id,
              customer: od.customer,
              food: od.food,
              size: od.size,
              salt: od.toppings.indexOf('More Salt') >= 0 ? "Yes" : "No",
              chilli: od.toppings.indexOf('More Chilli') >= 0 ? "Yes" : "No",
              pepper: od.toppings.indexOf('More Pepper') >= 0 ? "Yes" : "No",
              status: od.status
            });
          })
        }

        this.setState({
          rows: rows,
          loading: false,
          selectedRow: null,
        })
      });

    this.getInvoices();
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


  onRowClick = (rowIdx, row) => {
    if (row) {
      console.log(row.orderid);
      this.getInvoices();

      let rows = this.state.rows.slice();
      rows[rowIdx] = Object.assign({}, row, { isSelected: !row.isSelected });
      let hasInvoice = false;
      if (this.state.invoiceIds && this.state.invoiceIds.includes(row.orderid)) {
        hasInvoice = true;
      }
      this.setState(
        {
          selectedRow: row,
          hasInvoice: hasInvoice
        });
    }

  };

  reload = () => {
   this.componentDidMount();
  }

  render() {
    return (
      <div>
        <div className="jumbotron" style={{ padding: "30px" }}>
          {this.state.loading && <div ><p>Getting orders...</p>
            <ReactLoading type="bubbles" color="peru" height={100} width={100} />
          </div>}
          {!this.state.loading &&
            <div >
              <ReactDataGrid
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowSelection={{
                  showCheckbox: false,
                  selectBy: {
                    isSelectedKey: 'isSelected'
                  }
                }}
                onRowClick={this.onRowClick}
                rowsCount={this.getSize()}
                minHeight={400}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={this.handleFilterChange}
                onClearFilters={this.onClearFilters}

              />
            </div>}
        </div>

        {this.state.selectedRow && <div className="jumbotron"><S3FileUpload orderid={this.state.selectedRow ? this.state.selectedRow.orderid : " "} hasInvoice={this.state.hasInvoice} reload={this.reload} />  </div>}

      </div>);
  }
}

export default OrdersGrid;