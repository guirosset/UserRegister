import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Person } from './register-person/person-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterPersonService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/persons`
   }

  add(person: Person): Observable<Person> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Person>(`${this.url}`, person, { headers })
  }

}
