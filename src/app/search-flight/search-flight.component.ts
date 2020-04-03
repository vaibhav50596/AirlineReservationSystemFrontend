import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  public searchFlightForm: FormGroup;
  faCalendarAlt = faCalendarAlt;
  
  constructor(private airlineService: AirlineReservationSystemService) { }

  ngOnInit(): void {
    this.createForm();
    this.airlineService.getRoutes().subscribe(res => {
      console.log(res);
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
    obj['departureCity'] = this.searchFlightForm.controls['departureCity'].value;
    obj['arrivalCity'] = this.searchFlightForm.controls['arrivalCity'].value;
    obj['departDate'] = this.searchFlightForm.controls['departDate'].value;
    obj['returnDate'] = this.searchFlightForm.controls['returnDate'].value;
    console.log(obj);
  }

}
