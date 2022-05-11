import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  submitted = false;
  private readonly returnUrl = '/login';
  private token: string = '';


  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.error = null;
   }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
        this.token = params.token;
      }
    )
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.resetPassword(this.f.password.value, this.token)
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate([this.returnUrl]);
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
}
}
