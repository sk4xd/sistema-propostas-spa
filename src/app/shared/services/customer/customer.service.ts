import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerResponse } from '../../models/customers/customer-response.model';
import { Customer } from '../../models/customers/customer.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }

    getAll(pageNumber = 1, pageSize = 5): Observable<CustomerResponse> {

        return this.http.get<CustomerResponse>(`${environment.apiUrl}/customers`, {
          params: new HttpParams()
              // .set('courseId', userId.toString())
              // .set('filter', filter)
              // .set('sortOrder', sortOrder)
              .set('page', pageNumber.toString())
              .set('per_page', pageSize.toString())
      }).pipe(
          map((res: any) =>  res)
      )
    }

    save(customer: Customer): Observable<any> {
      return this.http.post(`${environment.apiUrl}/customers`, customer);
    }

    update(id:string | undefined, customer: Customer): Observable<any> {
      return this.http.put(`${environment.apiUrl}/customers/${id}`, customer);
    }
}
