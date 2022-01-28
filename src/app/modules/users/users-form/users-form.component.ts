import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/users/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  public user: User = {} as User;
  public editing: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    cellphone: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false, [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.user);
    this.checkEdit();
  }

  private checkEdit(): void {
    if (this.editing)
    this.form.controls['username'].disable();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveUser(): void {
    if (this.form.valid && !this.editing){
      this.userService.save(this.form.value).subscribe(res => {
        this.dialogRef.close('save');
      });
    }

    if (this.form.valid && this.editing){
      this.userService.update(this.user.id, this.form.value).subscribe(res => {
        this.dialogRef.close('update');
      });
    }
  }
}
