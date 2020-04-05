import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { cloneDeep, uniqBy } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {
  selectSeatForm: FormGroup;
  availableSeats: any[];

  constructor(private airlineService: AirlineReservationSystemService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.airlineService.getFoodPref().subscribe(res => {
      this.availableSeats = res;
      console.log(res);
    },err => {
      console.log(err);
    });
  }

  createForm(){
    this.selectSeatForm = new FormGroup({
      chooseSeats: new FormControl()
    })
  }

  //Update passenger object from previous component with selected Seat
  updatePassengerObj(){

  }

}
