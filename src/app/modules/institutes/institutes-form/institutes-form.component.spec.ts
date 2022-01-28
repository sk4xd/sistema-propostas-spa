import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutesFormComponent } from './institutes-form.component';

describe('InstitutesFormComponent', () => {
  let component: InstitutesFormComponent;
  let fixture: ComponentFixture<InstitutesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
