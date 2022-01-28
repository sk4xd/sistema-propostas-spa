import { ProposalUpload } from './../../models/proposals/proposal-upload.model';
import { Status } from './../../models/proposals/status.model';
import { ProposalsResponse } from './../../models/proposals/proposals-response.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersResponse } from '../../models/users/users-response.model';
import { User } from '../../models/users/user.model';
import { InstitutesResponse } from '../../models/institutes/institutes-response.model';


@Injectable({ providedIn: 'root' })
export class ProposalsService {
    constructor(private http: HttpClient) { }

    getAll(pageNumber = 1, pageSize = 5): Observable<ProposalsResponse> {

        return this.http.get<ProposalsResponse>(`${environment.apiUrl}/proposals`, {
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

    getAllInstitutes(pageNumber = 1, pageSize = 999): Observable<InstitutesResponse> {
        return this.http.get<InstitutesResponse>(`${environment.apiUrl}/proposals/institutes`, {
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

    getAllUploads(id: number): Observable<ProposalUpload[]> {
        return this.http.get<ProposalUpload[]>(`${environment.apiUrl}/proposals/${id}/uploads`).pipe(
          map((res: ProposalUpload[]) =>  res)
      )
    }

    getAllStatus(): Observable<Status[]> {
        return this.http.get<Status[]>(`${environment.apiUrl}/proposals/status`, {
      }).pipe(
          map((res: any) =>  res)
      )
    }

    uploadFiles(id: number, files: FormData): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/proposals/${id}/uploads`, files).pipe(
          map((res: any) =>  res)
      )
    }

    uploadContract(id: number, contract: FormData): Observable<void> {
        return this.http.patch<void>(`${environment.apiUrl}/proposals/${id}/contract`, contract).pipe(
          map((res: any) =>  res)
      )
    }

    downloadContract(id: number): Observable<any> {
      const httpOptions: Object = {
        observe: 'response',
        responseType: 'blob'
      };

        return this.http.get<any>(`${environment.apiUrl}/proposals/${id}/contract`, httpOptions).pipe(
          map((res: any) =>  Object.assign(res, {
            ...res,
            filename: res.headers.get('content-disposition')
          }))
      )
    }

    downloadUpload(id: number, upload_id: string): Observable<any> {
      const httpOptions: Object = {
        observe: 'response',
        responseType: 'blob'
      };

        return this.http.get<any>(`${environment.apiUrl}/proposals/${id}/uploads/${upload_id}`, httpOptions).pipe(
          map((res: any) =>  Object.assign(res, {
            ...res,
            filename: res.headers.get('content-disposition')
          }))
      )
    }

    deleteUpload(id: number, upload_id: string): Observable<any> {
      return this.http.delete<any>(`${environment.apiUrl}/proposals/${id}/uploads/${upload_id}`).pipe(
        map((res: any) =>  res))
    }

    save(user: User): Observable<any> {
      return this.http.post(`${environment.apiUrl}/proposals`, user);
    }

    update(id:string | undefined, user: User): Observable<any> {
      return this.http.put(`${environment.apiUrl}/proposals/${id}`, user);
    }
}
