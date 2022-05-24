import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { UserToken } from './shared/models/users/user-token.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'propostas-spa';

  user: UserToken | null = null;
  resetToken: string = '';

  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
      this.route.queryParams
      .subscribe(params => {
        this.resetToken = params.token
        }
      )
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.authenticationService.logout();
  }
}
