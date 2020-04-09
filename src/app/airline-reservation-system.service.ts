import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirlineReservationSystemService {

  apiUrl = 'http://django-env.eba-wgpvstzd.us-east-1.elasticbeanstalk.com/airline/';

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'getroutes/')
      .pipe(tap(routes => console.log('fetched routes')),
        catchError(this.handleError('getRoutes', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getFlights(id: number, departDate?: string, returnDate?: string, returnId?: number): Observable<any[]> {
    let httpParams;
    if(returnDate) {
      httpParams = new HttpParams().set('route_id', id.toString()).set('depart_date', departDate)
      .set('return_date', returnDate).set('return_route_id', returnId.toString());
    } else if(id && departDate) {
      httpParams = new HttpParams().set('route_id', id.toString()).set('depart_date', departDate);
    } else {
      httpParams = new HttpParams().set('route_id', id.toString());
    }
    return this.http.get<any[]>(this.apiUrl + 'gettrips/', {params: httpParams})
    .pipe(tap(flights => console.log('fetched trips')),
      catchError(this.handleError('getFlights', [])));
  }

  //Returns food preferences
  getFoodPref(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'getfood/')
    .pipe(tap(routes => console.log('fetched food names')),
        catchError(this.handleError('getFoodPref', [])));
  }

  getAvailableSeats(tripId: number): Observable<any[]>{
    const httpParams = new HttpParams().set('trip_id', tripId.toString());
    return this.http.get<any[]>(this.apiUrl + 'getavailseats',{params: httpParams})
    .pipe(tap(routes => console.log('Available seats')),
        catchError(this.handleError('getAvailableSeats', [])));
  }

  getBooking(id : number): Observable<any[]>{
    const httpParams = new HttpParams().set('booking_id', id.toString());
    return this.http.get<any[]>(this.apiUrl + 'getbookings/', {params: httpParams})
    .pipe(tap(routes => console.log('Booking')),
        catchError(this.handleError('getBooking', [])));
  }

  createPassenger(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'createpassenger', data)
    .pipe(tap(routes => console.log('createpassenger')),
        catchError(this.handleError('createpassenger', [])));
  }

  makeBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'createbooking', data)
    .pipe(tap(routes => console.log('createbooking')),
        catchError(this.handleError('createbooking', [])));
  }

  updateBooking(data: any): Observable<any> {
    return this.http.put(this.apiUrl + 'createbooking', data)
    .pipe(tap(routes => console.log('updatebooking')),
        catchError(this.handleError('updatebooking', [])));
  }

  deleteBooking(data: any): Observable<any> {
    return this.http.delete(this.apiUrl + 'createbooking', data)
    .pipe(tap(routes => console.log('deletebooking')),
        catchError(this.handleError('deletebooking', [])));
  }

} 
