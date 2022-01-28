import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomersRoutingModule } from './../customers/customers-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalsRoutingModule } from './proposals-routing.module';
import { ProposalsComponent } from './proposals.component';
import { ProposalsGridComponent } from './proposals-grid/proposals-grid.component';
import { ProposalsFormComponent } from './proposals-form/proposals-form.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaskApplierService, IConfig, NgxMaskModule } from 'ngx-mask';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProposalsUploadsComponent } from './proposals-uploads/proposals-uploads.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    ProposalsComponent,
    ProposalsGridComponent,
    ProposalsFormComponent,
    ProposalsUploadsComponent
  ],
  imports: [
    CommonModule,
    ProposalsRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    MaskApplierService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProposalsModule { }
