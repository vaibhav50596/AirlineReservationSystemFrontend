import { TestBed } from '@angular/core/testing';

import { AirlineReservationSystemService } from './airline-reservation-system.service';

describe('AirlineReservationSystemService', () => {
  let service: AirlineReservationSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineReservationSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
