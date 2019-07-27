import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../service/order.service';
import {OrderDetailsModel} from '../model/order-details.model';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderViewPage implements OnInit {

  form =
  {
    data:
    {
      order: <OrderDetailsModel> new OrderDetailsModel(),
    }
  };

  constructor(private router: Router, private route:ActivatedRoute, private orderService: OrderService, private localStorageService:LocalStorageService) {}

  ngOnInit() {
    if(this.localStorageService.get('userId')!=null){
      let orderId = this.route.snapshot.paramMap.get('orderId');
      this.orderService.getOrderByUserIdAndOrderId(1, orderId).subscribe(res=>{
        if(res){
          this.form.data.order = res[0];
        }
      });
    }else{
      this.router.navigateByUrl('/login');
    }

  }

  onHome(){
    this.router.navigateByUrl('/home');
  }


}
