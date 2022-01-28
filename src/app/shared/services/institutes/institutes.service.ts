import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Institute } from '../../models/institutes/institute.model';
import { InstitutesResponse } from './../../models/institutes/institutes-response.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutesService {
  constructor(private http: HttpClient) { }

  getAll(pageNumber = 1, pageSize = 5): Observable<InstitutesResponse> {
    return this.http.get<InstitutesResponse>(`${environment.apiUrl}/proposals/institutes`, {
      params: new HttpParams()
          .set('page', pageNumber.toString())
          .set('per_page', pageSize.toString())
    }).pipe(
        map((res: any) =>  res)
    )
  }

  save(institute: Institute): Observable<any> {
    return this.http.post(`${environment.apiUrl}/proposals/institutes`, institute);
  }
}
