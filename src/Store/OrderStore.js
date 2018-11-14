import { observable, computed, action } from "mobx";
import Customer from "../Order/Form/Customer";


class OrderStore {
   @observable orders = [];
   @observable isAuthenticated = false;
   @observable user= "";

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

