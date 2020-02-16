import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Grupo } from './group.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = `${environment.apiUrl}/grupos`
  }

  getAll(): Observable<Grupo[]> {
    return this.http.get<any>(`${this.url}`)
      .pipe(map(grupos => grupos))
  }
}
