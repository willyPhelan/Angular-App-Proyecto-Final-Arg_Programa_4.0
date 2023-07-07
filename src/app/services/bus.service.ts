import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  resourceUrl = environment.backendUrl + 'colectivos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError((error) => {
        console.log(error.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }

  findOne(id: number): Observable<Bus> {
    return this.http
    .get<Bus>(this.resourceUrl + '/' + id)
    .pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError(() => 'Colectivo inexistente!');
      })
    );
  }

  createBus(bus: BusDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, bus).pipe(
      catchError((err) => {
        console.log('Ocurrió un error: ');
        console.log(err);
        return throwError(() => 'No se pudo crear');
      })
    );
  }

  updateBus(bus: BusDTO) {
    return this.http.put<any>(this.resourceUrl + '/' + bus.id, bus).pipe(
      catchError((err) => {
        console.log('Ocurrió un error: ');
        console.log(err);
        return throwError(() => 'Colectivo inexistente!');
      })
    );
  }

  deleteBus(id: number): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(this.resourceUrl + '/' + id, { observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log('Ocurrió un error: ');
          console.log(err);
          return throwError(() => 'Verifique que el colectivo no esté asignado');
        })
      );
  }

}

export interface BusDTO {
  id?: number;
  patente: string;
  cantidadAsientos: string;
  modeloId: number;
}