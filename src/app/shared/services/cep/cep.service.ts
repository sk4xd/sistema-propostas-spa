import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../../models/cep/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly urlViaCep = 'https://viacep.com.br/ws/';

  constructor(
    private http: HttpClient
  ) { }

  public buscarCep(cep:string): Observable<Cep> {
    return this.http.get<Cep>(`${this.urlViaCep}${cep}/json/`);
  }
}
