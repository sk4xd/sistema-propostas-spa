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
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    cellphone: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    isAdmin: new FormControl(false)
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
    if (this.editing) {
      this.form.controls['username'].disable();
      this.form.controls['email'].disable();
    }
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

  showPassword(): void {
    let x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  changeButtonClass(): Object {
    let x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      return { 'icofont-eye btn btn-primary' : true };
    } else {
      return { 'icofont-eye-blocked btn btn-primary' : true };
    }
  }
}
