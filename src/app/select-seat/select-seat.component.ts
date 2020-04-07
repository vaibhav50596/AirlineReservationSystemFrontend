import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';
import { cloneDeep, uniqBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {
  selectSeatForm: FormGroup;
  availableSeats: any[];
  state$: Observable<object>;
  data: any;


  constructor(private airlineService: AirlineReservationSystemService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    //change to getAvailableSeats() and provide trip_id as a function parameter
    this.getRouteData();
    this.airlineService.getAvailableSeats(this.data["trip"]["id"]).subscribe(res => {
      this.availableSeats = res;
      // this.updatePassengerObj();
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
        this.data = res['data'];
        console.log(res['data']);
      }
    })
  }

  createForm(){
    this.selectSeatForm = new FormGroup({
      chooseSeats: new FormControl()
    })
  }

  //Update passenger object from previous component with selected Seat
  updatePassengerObj(){
    let obj = {}
    obj = this.data;
    obj['passenger']['seat_number'] = this.selectSeatForm.controls['chooseSeats'].value
    console.log('Added selected seat');
    console.log(obj);
  }

}
