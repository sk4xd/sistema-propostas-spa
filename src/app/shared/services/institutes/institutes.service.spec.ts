/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InstitutesService } from './institutes.service';

describe('Service: Institutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitutesService]
    });
  });

  it('should ...', inject([InstitutesService], (service: InstitutesService) => {
    expect(service).toBeTruthy();
  }));
});
