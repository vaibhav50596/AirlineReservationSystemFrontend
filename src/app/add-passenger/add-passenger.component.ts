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

  constructor(private airlineService: AirlineReservationSystemService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getRouteData();
    this.airlineService.getFoodPref().subscribe(res => {
      this.foodPrefs = res;
      console.log(res);
    },err => {
      console.log(err);
    });
  }

  //Function is used to obtain data from previous page
  //Data from previous page stored in trip
  getRouteData() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(res => {
      if (res && res['data'] ) {
        //do something
        this.trip = res['data'];
        console.log(res['data']);
      }
    })
  }

  createForm(){
    this.addPassengerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      sex: new FormControl(),
      foodName: new FormControl()
    })
  }

  buildPassengerObj() {
    let obj = {};
    obj['first_name'] = this.addPassengerForm.controls['firstName'].value;
    obj['last_name'] = this.addPassengerForm.controls['lastName'].value;
    obj['age'] = this.addPassengerForm.controls['age'].value;
    obj['sex'] = this.addPassengerForm.controls['sex'].value;
    obj['food_name'] = this.addPassengerForm.controls['foodName'].value;
    console.log(obj);

    //super object consisting of passenger details from this component and trip details from previous componenet
    let superObj = {
      'trip': this.trip,
      'passenger': obj
    }
    this.router.navigate(['/select-seat'], {state: {data: superObj}});
    console.log("Super object is:");
    console.log(superObj)
  }
}
