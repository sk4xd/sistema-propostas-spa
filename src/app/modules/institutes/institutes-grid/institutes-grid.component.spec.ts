import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutesGridComponent } from './institutes-grid.component';

describe('InstitutesGridComponent', () => {
  let component: InstitutesGridComponent;
  let fixture: ComponentFixture<InstitutesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
