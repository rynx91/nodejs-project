import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from '../service/user.service';
import {LocalStorageService} from "angular-2-local-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPage implements OnInit {

  form =
  {
    data:
    {
      username: <string> null,
      password: <string> null
    },
    error:
    {
      login: <string> null
    }
  };

  constructor(private router: Router, private userService:UserService, private localStorageService:LocalStorageService) {}

  ngOnInit() {
    if(this.localStorageService.get('userId')!=null){
      this.router.navigateByUrl('/home');
    }
  }

  onLogin(){
    this.form.error.login = null;
    if(!this.form.data.username){
      this.form.error.login = 'Please key in your username';
    }else if(!this.form.data.password){
      this.form.error.login = 'Please key in your password';
    }else{
      this.userService.verifyUserPin(this.form.data.username, this.form.data.password).subscribe(res=>{
        if(res){
          this.localStorageService.set('userId', this.form.data.username);
          this.router.navigateByUrl('/home');
        }else{
          this.form.error.login = 'Invalid Username/Password.';
        }
      });
    }
  }

}
