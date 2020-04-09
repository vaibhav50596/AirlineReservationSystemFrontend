import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {
  state$: Observable<object>;
  bookingSummary: any = {};
  bookingResponse: any = undefined;

  constructor(private airlineService: AirlineReservationSystemService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteData();
  }

  getRouteData() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data']) {
        this.bookingSummary = res['data'];
        console.log("Booking Summary: ", this.bookingSummary);
      }
    })
  }

  selectDepartingFlight() {
    let obj = {
      'book_type':"One-Way",
      'trip_id': this.bookingSummary['trip']['id'], 
      'passenger_id': this.bookingSummary['passenger']['id']
    }
    this.bookingResponse = undefined;
    this.airlineService.makeBooking(obj).subscribe(res => {
      console.log(res);
      this.bookingResponse = res;
    }, err => {
      console.log(err);
    })
  }

  updateFlight() {
    let obj = {
      'id': this.bookingSummary['id'],
      'book_type':"One-Way",
      'trip_id': this.bookingSummary['trip']['id'], 
      'passenger_id': this.bookingSummary['passenger']['id'],
    }
    this.bookingResponse = undefined;
    this.airlineService.updateBooking(obj).subscribe(res => {
      console.log(res);
      this.bookingResponse = res;
    }, err => {
      console.log(err);
    })
  }

}
