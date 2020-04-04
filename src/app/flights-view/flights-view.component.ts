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
  
  constructor(private airlineService: AirlineReservationSystemService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data']) {
        this.getFlights(res['data']['id'], res['data']['departDate']);
      }
    })
  }


  getFlights(id: number, departDate: string, returnDate?: string) {
    this.airlineService.getFlights(id, departDate, returnDate)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

}
