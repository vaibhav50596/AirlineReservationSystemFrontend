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
  modifyFlightForm: FormGroup
  booking: any = undefined;

  constructor(private airlineService: AirlineReservationSystemService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.airlineService.getRoutes().subscribe(res => {
      this.routes = res;
    }, err => {
      console.log(err);
    });
    this.createModifyFlightForm();
  }

  createForm() {
    this.searchFlightForm = new FormGroup({
      departureCity: new FormControl(),
      arrivalCity: new FormControl(),
      departDate: new FormControl(),
      //returnDate: new FormControl()
    });
  }

  createModifyFlightForm(){
    this.modifyFlightForm = new FormGroup({
      modifyBooking: new FormControl(),
    });
  }

  getFlights() {
    let obj = {};
    obj['departDate'] = this.searchFlightForm.controls['departDate'].value.year + '-' +
                        this.searchFlightForm.controls['departDate'].value.month + '-' +
                        this.searchFlightForm.controls['departDate'].value.day;
    obj['id'] = this.getRouteId();
    // if(this.searchFlightForm.controls['returnDate'].value) {
    //   obj['returnDate'] = this.searchFlightForm.controls['returnDate'].value.year + '-' +
    //                     this.searchFlightForm.controls['returnDate'].value.month + '-' +
    //                     this.searchFlightForm.controls['returnDate'].value.day;
    //   obj['returnId'] = this.getReturnRouteId();
    //   obj['book_type'] = "Round-Trip";
    // }
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

  getReturnRouteId(): number {
    if(this.searchFlightForm) {
      let id;
      this.routes.forEach(element => {
        if(element.departure_city === this.searchFlightForm.controls['arrivalCity'].value &&
        element.arrival_city === this.searchFlightForm.controls['departureCity'].value) {
          id = element.id;
        }
      })
      return id;
    }
  }

  getFlightBooking(){
    if (this.modifyFlightForm.controls['modifyBooking'].value){
      this.airlineService.getBooking(this.modifyFlightForm.controls['modifyBooking'].value).subscribe(res => {
      if(res && res.length > 0){
        this.booking = res;
        console.log(this.booking);
        this.router.navigate(['/flights-view'], {state: {booking: this.booking}});
      } else {
        this.booking = [];
      }
      }, err => {
        console.log(err);
      });
    }
  }
}