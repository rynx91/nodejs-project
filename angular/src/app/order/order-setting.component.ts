import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-order-setting',
  templateUrl: './order-setting.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderSettingPage implements OnInit {

  form =
  {
    data:
    {
      currentFrequency: <number> null,
      newFrequency: <number> null,
      msg: <string> null
    }
  };

  constructor(private router: Router, private route:ActivatedRoute, private userService: UserService, private localStorageService:LocalStorageService) {}

  ngOnInit() {
    if(this.localStorageService.get('userId')!=null){
      this.getCurrentFrequency();
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  onSubmit(){
    this.form.data.msg = null;
    this.userService.updateFrequencyByUserId(this.localStorageService.get('userId'), this.form.data.newFrequency).subscribe(res=>{
      this.getCurrentFrequency();
      this.form.data.newFrequency = null;
      this.form.data.msg = 'Update success!'
    });
  }

  getCurrentFrequency()
  {
    this.userService.getUserByUserId(this.localStorageService.get('userId')).subscribe( res=>{
      this.form.data.currentFrequency = res[0].update_frequency;
    });
  }

}
