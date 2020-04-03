import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirlineReservationSystemService {

  apiUrl = 'http://django-env.eba-wgpvstzd.us-east-1.elasticbeanstalk.com/airline/';

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'getroutes')
      .pipe(
        tap(routes => console.log('fetched routes')),
        catchError(this.handleError('getRoutes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
