import { Component } from '@angular/core';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AirlineReservationSystem';
  faPlaneDeparture = faPlaneDeparture;
  url: string = 'http://django-env.eba-wgpvstzd.us-east-1.elasticbeanstalk.com/admin/';

  goToAdminPortal(){
    window.open(this.url, "_blank");
  }
}
