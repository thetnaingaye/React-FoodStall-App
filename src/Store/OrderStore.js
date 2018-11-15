import { observable, computed, action } from "mobx";
import { Storage } from 'aws-amplify';



class OrderStore {
  @observable orders = [];
  @observable isAuthenticated = false;
  @observable user = "";

  @observable ordersFromDb = [];

  @action.bound
  addOrder(item) {
    this.orders.push(item)
  }

  @action.bound
  removeOrder(item) {
    this.orders.pop(item)
  }

  @computed get totalOrders() {
    return this.orders.length;
  }

}

export default OrderStore;

