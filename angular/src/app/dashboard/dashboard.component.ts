import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  showNavBar = false;
  navbarOpen = false;
  userId = null;

  constructor(private router:Router, private localStorageService:LocalStorageService) {

  }

  ngOnInit(){

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout(){
    this.localStorageService.remove('userId');
    this.showNavBar = false;
    this.userId = null;
    this.router.navigateByUrl('/login');
  }

  checkIsLogin(){
    this.userId = this.localStorageService.get('userId');
    if(this.userId!=null){
      return true;
    }else{
      return false;
    }
  }



}
