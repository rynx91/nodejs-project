import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderModel} from '../model/order.model';
import {OrderService} from '../service/order.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderPage implements OnInit {

  form =
  {
    data:
    {
      order: <OrderModel> new OrderModel(),
      isOther: <boolean> false,
      isVerified: <boolean> false,
      isLoading: <boolean> false
    },
    error:
    {
      order: <string> null,
      pin: <string> null
    }
  };

  constructor(private router: Router, private orderService: OrderService, private localStorageService:LocalStorageService) {}

  ngOnInit() {
    if(!this.localStorageService.get('userId')){
      this.router.navigateByUrl('/login');
    }
  }

  createOrder(){
    this.form.error.order = null;
    if(this.form.data.order.amount==null || this.form.data.order.amount<=0){
      this.form.error.order = 'Please select a valid amount.';
    }else{
      this.form.data.order.user_id = 1;
      this.form.data.isLoading = true;
      this.orderService.createOrder(this.form.data.order).subscribe(res=>{
        if(res.status=='confirmed'){
          this.form.data.isLoading = false;
          alert("Your order has been confirmed! Please wait for " +res.update_frequency+ " seconds, and we will update the status to delivered.");
          this.form.data.isLoading = true;
          setTimeout(() => {
            this.orderService.updateOrderByOrderIdAndStatus(res.order_id, 'delivered').subscribe(ret=>{
              this.form.data.isLoading = false;
              this.router.navigateByUrl('/order/view/'+res.order_id);
            });
          }, res.update_frequency*1000);
        }else{
          this.form.data.isLoading = false;
          alert('Your order has been cancelled!');
          this.router.navigateByUrl('/order/view/'+res.order_id);
        }

      });
    }
  }

  updateOrderAmount(amount){
    if(amount==0){
      this.form.data.isOther = true;
    }else{
      this.form.data.isOther = false;
    }
    this.form.data.order.amount = amount;
  }

}
