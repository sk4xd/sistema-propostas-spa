import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'proposals', loadChildren: () => import('./modules/proposals/proposals.module').then(m => m.ProposalsModule) },
  { path: 'institutes', loadChildren: () => import('./modules/institutes/institutes.module').then(m => m.InstitutesModule) },
  { path: 'forgot', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'reset', loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
