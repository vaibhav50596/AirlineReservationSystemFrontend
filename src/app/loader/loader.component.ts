import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AirlineReservationSystemService } from '../airline-reservation-system.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading: Subject<boolean>;
  //isShowing: boolean = false;
  
  //We can also subscribe() and unsubscribe() to above isLoading subject
  //to avoid memory leaks, but using "async" pipe in html is more cleaner way

  constructor(private airlineService: AirlineReservationSystemService) { }

  ngOnInit(): void {
    this.isLoading = this.airlineService.isLoading;

    // this.airlineService.isLoading.subscribe(res => {
    //   console.log("Value of isLoading ", res);
    //   this.isShowing = res;
    // });
  }

  ngOnDestroy(): void {
    //this.isShowing = false;
  }

}
