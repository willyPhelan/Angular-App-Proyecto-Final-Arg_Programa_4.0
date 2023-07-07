import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  resourceUrl = environment.backendUrl + 'modelos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError((error) => {
        console.log(error.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }

  findOne(id: number): Observable<Model> {
    return this.http.get<Model>(this.resourceUrl + '/' + id).pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }
}