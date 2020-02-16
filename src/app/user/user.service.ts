import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/usuarios`
   }

  getAll(nome: string): Observable<Usuario[]> {
    let params = new HttpParams().set('nome', nome);

    return this.http.get<any>(`${this.url}`,  { params }).pipe(map(usuarios => usuarios.content))
  }

  add(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Usuario>(`${this.url}`, usuario, { headers })
  }

  put(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.put<Usuario>(`${this.url}/${usuario.id}`, usuario, { headers })
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);

  }

  delete(id: number): Observable<void> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(map(() => null));
  }
}
