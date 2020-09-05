import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { of, Observable } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
