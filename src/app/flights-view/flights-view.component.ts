import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {
  state$: Observable<object>;
  flights: any[] = [];
  //isRoundTrip: boolean = false;
  booking: any[] = undefined;
  dates: any[] = undefined;
  
  constructor(private airlineService: AirlineReservationSystemService, public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.booking = undefined;
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data']) {
        this.flights = [];
        this.flights = res['data'];
        //this.isRoundTrip = res['data']['returnDate'] && res['data']['returnId'] ? true : false;
      }
      if(res && res['booking']) {
        console.log(res['booking']);
        this.booking = res['booking'];
        this.getDatesForBookedFlight(this.booking[0]['trip_id']['route_id']['id']);
      }
    })
  }

  getDatesForBookedFlight(tripId) {
    this.dates = [];
    this.airlineService.getFlights(tripId)
    .subscribe(res => {
      console.log(res);
      if(res && res.length) {
        this.dates = res;
      } else {
        this.dates = [];
      }
    }, err => {
      console.log(err);
    });
  }

  selectDepartingFlight(flight: any) {
    console.log(flight);
    this.router.navigate(['/add-passenger'], {state: {data: flight}});
  }

  selectFlight(changedDate) {
    let routeData = {
      'id': this.booking[0]['id'],
      'trip': this.booking[0]['trip_id'], 
      'passenger': this.booking[0]['passenger_id'],
      'changedDate': changedDate
    };
    console.log("New Booking Object", routeData);
    this.router.navigate(['/booking-summary'], {state: {data: routeData}});
  }

  cancelFlight() {
    // let obj = {
    //   'id': this.booking[0]['id'],
    //   'book_type':"One-Way",
    //   'trip_id': this.booking[0]['trip_id']['id'], 
    //   'passenger_id': this.booking[0]['passenger_id']['id'],
    // }
    this.airlineService.deleteBooking(this.booking[0]['id']).subscribe(res =>{
      console.log("Booking is deleted", res);
      this.booking = [];
    }, err => {
      console.log(err);
    })
  }

}
