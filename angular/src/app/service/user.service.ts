import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/internal/operators";
import {OrderModel} from '../model/order.model';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {UserModel} from '../model/user.model';
import update from '@angular/cli/commands/update';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  verifyUserPin(userId, pin): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId).set('pin', pin);

    return this.http.get<boolean>(`${environment.apiUrl}/user/verify`, { headers: headers, params: params });
  }

  updateFrequencyByUserId(userId, updateFrequency):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId).set('updateFrequency',updateFrequency);
    return this.http.post<any>(`${environment.apiUrl}/user/update-frequency`, {}, {headers: headers, params:params});
  }

  getUserByUserId(userId): Observable<UserModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId);

    return this.http.get<UserModel>(`${environment.apiUrl}/user`, { headers: headers, params: params });
  }

}
