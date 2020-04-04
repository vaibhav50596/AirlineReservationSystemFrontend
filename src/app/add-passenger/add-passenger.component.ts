import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { cloneDeep, uniqBy } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  addPassengerForm: FormGroup;
  foodPrefs: any[];

  constructor(private airlineService: AirlineReservationSystemService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.airlineService.getFoodPref().subscribe(res => {
      this.foodPrefs = res;
      console.log(res);
    },err => {
      console.log(err);
    });
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
    this.router.navigate(['/select-seat'], {state: {data: obj}});
  }
}
