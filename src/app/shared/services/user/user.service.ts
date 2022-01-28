import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersResponse } from '../../models/users/users-response.model';
import { User } from '../../models/users/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(pageNumber = 1, pageSize = 5): Observable<UsersResponse> {

        return this.http.get<UsersResponse>(`${environment.apiUrl}/users`, {
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

    save(user: User): Observable<any> {
      return this.http.post(`${environment.apiUrl}/users`, user);
    }

    update(id:string | undefined, user: User): Observable<any> {
      return this.http.put(`${environment.apiUrl}/users/${id}`, user);
    }
}
