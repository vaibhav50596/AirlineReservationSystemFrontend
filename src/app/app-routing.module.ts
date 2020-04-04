import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { FlightsViewComponent } from './flights-view/flights-view.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';


const routes: Routes = [
  { path: '', redirectTo: '/search-flight', pathMatch: 'full' },
  { path: 'search-flight', component: SearchFlightComponent },
  { path: 'flights-view', component: FlightsViewComponent },
  { path: 'add-passenger', component: AddPassengerComponent},
  { path: 'select-seat', component: SelectSeatComponent},
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
