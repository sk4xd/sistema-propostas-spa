import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomersGridComponent } from './customers-grid.component';

describe('CustomersGridComponent', () => {
  let component: CustomersGridComponent;
  let fixture: ComponentFixture<CustomersGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CustomersGridComponent]
    });
    fixture = TestBed.createComponent(CustomersGridComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
