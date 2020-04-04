import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { FlightsViewComponent } from './flights-view/flights-view.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightComponent,
    FlightsViewComponent,
    NoPageFoundComponent,
    AddPassengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
