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
  
  constructor(private airlineService: AirlineReservationSystemService, public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.booking = undefined;
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data']) {
        this.getFlights(res['data']['id'], res['data']['departDate'], res['data']['returnDate'], res['data']['returnId']);
        //this.isRoundTrip = res['data']['returnDate'] && res['data']['returnId'] ? true : false;
      }
      if(res && res['booking']){
        console.log(res['booking']);
        this.booking = res['booking'];
      }
    })
  }


  getFlights(id: number, departDate: string, returnDate?: string, returnId?: number) {
    this.airlineService.getFlights(id, departDate, returnDate, returnId)
      .subscribe(res => {
        console.log(res);
        this.flights = [];
        this.flights = res;
        console.log("Flights data: ", this.flights)
      }, err => {
        console.log(err);
      });
  }

  selectDepartingFlight(flight: any) {
    console.log(flight);
    this.router.navigate(['/add-passenger'], {state: {data: flight}});
  }

}
