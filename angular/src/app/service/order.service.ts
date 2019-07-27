import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {OrderModel} from '../model/order.model';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {OrderSearchModel} from '../model/order-search.model';
import {OrderDetailsModel} from '../model/order-details.model';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }

  findOrdersByUserId(userId): Observable<OrderModel[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId);

    return this.http.get<OrderModel[]>(`${environment.apiUrl}/order`, { headers: headers, params: params });
  }

  createOrder(order: OrderModel): Observable<OrderModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<OrderModel>(`${environment.apiUrl}/order/create`, JSON.stringify(order),{headers: headers});
  }

  updateOrderByOrderIdAndStatus(orderId, status): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/order/update`, { 'orderId':orderId, 'status':status });
  }

  findOrders(order:OrderSearchModel): Observable<OrderModel[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<OrderModel[]>(`${environment.apiUrl}/order/search`, JSON.stringify(order),{headers: headers});
  }

  getOrderByUserIdAndOrderId(userId, orderId): Observable<OrderDetailsModel>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId).set('orderId',orderId);
    return this.http.get<OrderDetailsModel>(`${environment.apiUrl}/order/id`,{headers: headers, params: params});
  }


}
