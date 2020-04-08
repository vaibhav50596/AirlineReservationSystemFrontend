import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { cloneDeep, uniqBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  addPassengerForm: FormGroup;
  foodPrefs: any[];
  state$: Observable<object>;
  trip: any;
  availableSeats: any[];

  constructor(private airlineService: AirlineReservationSystemService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getRouteData();
    this.getFoodPreference();
  }

  getFoodPreference() {
    this.airlineService.getFoodPref().subscribe(res => {
      this.foodPrefs = res;
      console.log(res);
    },err => {
      console.log(err);
    });
  }

  getAvailableSeats() {
    this.airlineService.getAvailableSeats(this.trip["id"]).subscribe(res => {
      this.availableSeats = res;
      console.log(res);
    },err => {
      console.log(err);
    });
  }

  getRouteData() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data'] ) {
        this.trip = res['data'];
        this.getAvailableSeats();
        console.log(res['data']);
      }
    })
  }

  createForm(){
    this.addPassengerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      age: new FormControl(),
      sex: new FormControl(),
      foodName: new FormControl(),
      chooseSeats: new FormControl()
    })
  }

  buildPassengerObj() {
    let obj = {};
    obj['fname'] = this.addPassengerForm.controls['firstName'].value;
    obj['lname'] = this.addPassengerForm.controls['lastName'].value;
    obj['email'] = this.addPassengerForm.controls['email'].value;
    obj['age'] = this.addPassengerForm.controls['age'].value;
    obj['sex'] = this.addPassengerForm.controls['sex'].value;
    obj['seat_number'] = this.addPassengerForm.controls['chooseSeats'].value
    obj['food_name'] = this.addPassengerForm.controls['foodName'].value;
    this.airlineService.createPassenger(obj).subscribe(res => {
      console.log(res);
      this.router.navigate(['/booking-summary' , {state: {data: {'trip': this.trip, 'passenger': obj }}}]);
    }, err => {
      console.log(err);
    });
  }
}
