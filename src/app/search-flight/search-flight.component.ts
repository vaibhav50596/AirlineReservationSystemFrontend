import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { cloneDeep, uniqBy } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  searchFlightForm: FormGroup;
  faCalendarAlt = faCalendarAlt;
  routes: any[];
  departureRoutes: any[] = [];
  arrivalRoutes: any[] = [];

  constructor(private airlineService: AirlineReservationSystemService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.airlineService.getRoutes().subscribe(res => {
      this.routes = res;
    }, err => {
      console.log(err);
    });
  }

  createForm() {
    this.searchFlightForm = new FormGroup({
      departureCity: new FormControl(),
      arrivalCity: new FormControl(),
      departDate: new FormControl(),
      returnDate: new FormControl()
    });
  }

  getFlights() {
    let obj = {};
    obj['departDate'] = this.searchFlightForm.controls['departDate'].value.year + '-' +
                        this.searchFlightForm.controls['departDate'].value.month + '-' +
                        this.searchFlightForm.controls['departDate'].value.day;
    if(this.searchFlightForm.controls['returnDate'].value) {
      obj['returnDate'] = this.searchFlightForm.controls['returnDate'].value.year + '-' +
                        this.searchFlightForm.controls['returnDate'].value.month + '-' +
                        this.searchFlightForm.controls['returnDate'].value.day;
    }
    obj['id'] = this.getRouteId();
    this.router.navigate(['/flights-view'], {state: {data: obj}});
  }

  getDepartureRoutesOnPage() {
    if (this.searchFlightForm && this.searchFlightForm.controls['departureCity'].value.length == 2) {
      this.departureRoutes = [];
      this.routes.filter(element => {
        if(element.departure_city.toLowerCase().includes(this.searchFlightForm.controls['departureCity'].value.toLowerCase())) {
          this.departureRoutes.push(element);
        }
      })
      this.departureRoutes = cloneDeep(uniqBy(this.departureRoutes, 'departure_city'));
      console.log(this.departureRoutes);
    }
  }

  getArrivalRoutesOnPage() {
    if (this.searchFlightForm) {
      this.arrivalRoutes = [];
      this.routes.filter(element => {
        if(element.departure_city === this.searchFlightForm.controls['departureCity'].value) {
          this.arrivalRoutes.push(element);
        }
      })
      this.arrivalRoutes = cloneDeep(uniqBy(this.arrivalRoutes, 'arrival_city'));
      console.log(this.arrivalRoutes);
    }
  }

  getRouteId(): number {
    if(this.searchFlightForm) {
      let id;
      this.routes.forEach(element => {
        if(element.departure_city === this.searchFlightForm.controls['departureCity'].value &&
        element.arrival_city === this.searchFlightForm.controls['arrivalCity'].value) {
          id = element.id;
        }
      })
      return id;
    }
  }
  
}