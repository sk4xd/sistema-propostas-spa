import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Institute } from 'src/app/shared/models/institutes/institute.model';
import { InstitutesService } from 'src/app/shared/services/institutes/institutes.service';

@Component({
  selector: 'app-institutes-form',
  templateUrl: './institutes-form.component.html',
  styleUrls: ['./institutes-form.component.css']
})
export class InstitutesFormComponent implements OnInit {
  public institute: Institute = {} as Institute;
  public editing: boolean = false;

  form: FormGroup = new FormGroup({
    institute_name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<InstitutesFormComponent>,
    private institutesService: InstitutesService
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.institute);
    this.checkEdit();
  }

  private checkEdit(): void {
    if (this.editing)
    this.form.controls['name'].disable();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveInstitute(): void {
    if (this.form.valid && !this.editing){
      this.institutesService.save(this.form.value).subscribe(res => {
        this.dialogRef.close('save');
      });
    }
  }
}
