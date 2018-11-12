import { observable, computed, action } from "mobx";


class OrderStore {
   @observable orders = [];
   @observable isAuthenticated = false;
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

