import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { InstitutesFormComponent } from './institutes-form/institutes-form.component';
import { InstitutesGridComponent } from './institutes-grid/institutes-grid.component';
import { InstitutesComponent } from './institutes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { InstitutesRoutingModule } from './institutes-routing.module';

@NgModule({
  declarations: [
    InstitutesComponent,
    InstitutesFormComponent,
    InstitutesGridComponent
  ],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    SweetAlert2Module,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class InstitutesModule { }
