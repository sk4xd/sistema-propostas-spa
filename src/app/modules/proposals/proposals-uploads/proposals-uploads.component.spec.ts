import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsUploadsComponent } from './proposals-uploads.component';

describe('ProposalsUploadsComponent', () => {
  let component: ProposalsUploadsComponent;
  let fixture: ComponentFixture<ProposalsUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsUploadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
