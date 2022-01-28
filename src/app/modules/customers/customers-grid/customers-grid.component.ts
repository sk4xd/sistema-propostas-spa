import { CepService } from './../../../shared/services/cep/cep.service';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomersFormComponent } from '../customers-form/customers-form.component';
import { finalize } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/shared/models/customers/customer-response.model';
import { Customer } from 'src/app/shared/models/customers/customer.model';

@Component({
  selector: 'app-customers-grid',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.css']
})
export class CustomersGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  customersData = {} as CustomerResponse;
  loading = false;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {
    this.paginator = {} as MatPaginator;
    this.input = {} as ElementRef<HTMLInputElement>;
  }

  ngOnInit() {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.loading = true;
    this.customerService.getAll()
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(res => {
      this.customersData = res;
    })

  }

  public changePage(pageChange: PageEvent): void {
    this.loading = true;
    this.customerService.getAll(pageChange.pageIndex + 1, pageChange.pageSize).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res: any)=> {
      this.customersData = res;
    });
  }

  public openCustomerForm(): void {
    let dialogRef = this.dialog.open(CustomersFormComponent, {
      maxHeight: '900px',
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'save')
      this.loadCustomers()
    })
  }

  public editCustomerForm(customer: Customer): void {
    let dialogRef = this.dialog.open(CustomersFormComponent, {
      maxHeight: '900px',
      width: '800px',
      disableClose: true,
    });

    dialogRef.componentInstance.customer = customer;
    dialogRef.componentInstance.editing = true;

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'update')
      this.loadCustomers()
    })
  }

}
