import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderModel} from '../model/order.model';
import {OrderService} from '../service/order.service';
import {OrderSearchModel} from '../model/order-search.model';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePage implements OnInit {

  form =
  {
    data:
    {
      orders: <OrderModel[]> [],
      orderSearch: <OrderSearchModel> new OrderSearchModel()
    },
    options:
    {
      status: ['created','confirmed','delivered','cancelled']
    },
    error:
    {
      search: <string> null
    }
  };

  constructor(private router: Router, private orderService: OrderService, private localStorage:LocalStorageService) {}

  ngOnInit() {
    if(this.localStorage.get('userId')!=null){
      this.orderService.findOrdersByUserId(1).subscribe(res=>{
        this.form.data.orders = res;
      });
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  cancelOrder(orderId){
    this.orderService.updateOrderByOrderIdAndStatus(orderId, 'cancelled').subscribe(res=>{
      this.orderService.findOrdersByUserId(1).subscribe(ret=>{
        this.form.data.orders = ret;
      })
    });
  }

  onOrder(){
    this.router.navigateByUrl('/order');
  }

  onSearch(){
    this.form.error.search = null;
    if(!this.form.data.orderSearch.amount_start && this.form.data.orderSearch.amount_end){
      if(!this.form.data.orderSearch.amount_start){
        this.form.error.search = 'Starting amount cannot be empty';
      }else if(this.form.data.orderSearch.amount_end<=0){
        this.form.error.search = 'Amount must be more than RM0.';
      }else if(this.form.data.orderSearch.amount_end < this.form.data.orderSearch.amount_start){
        this.form.error.search = 'The starting amount should not exceed the ending amount.';
      }

    }
    else if(this.form.data.orderSearch.amount_start<=0 || this.form.data.orderSearch.amount_end<=0){
      this.form.error.search = 'Amount must be more than RM0.';
    }

    if(!this.form.error.search){
      this.form.data.orderSearch.user_id = 1;
      this.orderService.findOrders(this.form.data.orderSearch).subscribe(res=>{
        this.form.data.orders = res;
      });
    }
  }

  viewOrder(orderId){
    this.router.navigateByUrl('/order/view/'+orderId);
  }


}
