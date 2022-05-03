import { FormGroup, FormControl } from '@angular/forms';
import { Status } from './../../../shared/models/proposals/status.model';
import { Customer } from 'src/app/shared/models/customers/customer.model';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProposalsService } from './../../../shared/services/proposals/proposals.service';
import { ProposalsResponse } from './../../../shared/models/proposals/proposals-response.model';
import { Proposal } from './../../../shared/models/proposals/proposal.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProposalsFormComponent } from './../proposals-form/proposals-form.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-proposals-grid',
  templateUrl: './proposals-grid.component.html',
  styleUrls: ['./proposals-grid.component.css']
})

export class ProposalsGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  loading = false;

  propostasData: ProposalsResponse = {} as ProposalsResponse;
  propostasDropdownData: ProposalsResponse = {} as ProposalsResponse;
  proposta = {};
  opened = false;
  customers: Customer[] = [];
  statuses: Status[] = [];
  selectedData = ['Teste'];
  proposalsDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'id',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    placeholder: 'Selecione',
    searchPlaceholderText: 'Buscar',
    noDataAvailablePlaceholderText: 'Não há dados'
  };
  customerDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'cpfCnpj',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    placeholder: 'Selecione',
    searchPlaceholderText: 'Buscar',
    noDataAvailablePlaceholderText: 'Não há dados'
  };

  form: FormGroup = new FormGroup({
    proposal: new FormControl(''),
    contract_type: new FormControl(''),
    customer: new FormControl(''),
    contract_status: new FormControl(''),
    proposal_status: new FormControl(''),
    date: new FormControl('')
  });

  constructor(
    public dialog: MatDialog,
    private proposalsService: ProposalsService,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) {
    this.paginator = {} as MatPaginator;
    this.input = {} as ElementRef<HTMLInputElement>;
   }

  ngOnInit(): void {
    this.loadProposals();
    this.loadDropDownProposals();
    this.fillCustomers();
    this.fillStatus();
  }

  editPropostaForm({}): void {

  }

  public openCloseAccordion(): Object {
    return {
      "show" : this.opened
    }
  }

  public changeAccordionFlag(opened: boolean): void {
    if(!opened) {
      this.opened = true;
    }
    this.opened = false;
  }

  public changePage(pageChange: PageEvent): void {
    this.spinner.show();
    this.proposalsService.getAll(pageChange.pageIndex + 1, pageChange.pageSize, this.buildFilterObject())
    .pipe(finalize((() => this.spinner.hide)))
    .subscribe((res: any) => {
      this.propostasData = res;
    });
  }

  public loadProposals(): void {
    this.spinner.show();
    this.proposalsService.getAll(1, 5, this.buildFilterObject())
    .pipe(finalize((() => this.spinner.hide)))
    .subscribe((res: any) => {
      this.propostasData = res;
    })
  }

  private loadDropDownProposals(): void {
    this.spinner.show();
    this.proposalsService.getAll(1, 999, this.buildFilterObject())
    .pipe(finalize((() => this.spinner.hide)))
    .subscribe((res: any) => {
      this.propostasDropdownData = res;
    })
  }

  public openProposalForm(): void {
    let dialogRef = this.dialog.open(ProposalsFormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '80%',
      panelClass: 'full-screen-modal',
      disableClose: true
    });

    dialogRef.componentInstance.proposal.status = { id: undefined, status_description: 'Nova'}

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'save')
      this.loadProposals()
    })
  }

  public editProposalForm(proposal: any): void {
    let dialogRef = this.dialog.open(ProposalsFormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '80%',
      panelClass: 'full-screen-modal',
      disableClose: true,
    });

    dialogRef.componentInstance.proposal = proposal;
    dialogRef.componentInstance.editing = true;

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'update')
      this.loadProposals()
    })
  }

  public numberToContractStatus(statusNumber: number): string {
    switch(statusNumber) {
      case 1:
        return 'Enviado'
      case 2:
        return 'Assinado'
      case 3:
        return 'Pago'
      default:
        return 'N/A'
    }
  }


  fillStatus(): void {
    this.proposalsService.getAllStatus().subscribe(res => {
      this.statuses = res;
    })
  }

  fillCustomers(): void {
    this.customerService.getAll(1, 999).subscribe(res => {
      this.customers = res.data.map(customer => {
        return Object.assign({
          ...customer,
          cpfCnpj: customer.cpfCnpj ? customer.cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : '000-000-000-00'
        })
      })
    })
  }

  clearFilter(): void {
    this.form.reset();
    this.form.controls['contract_type'].setValue('');
    this.form.controls['contract_status'].setValue('');
  }

  buildFilterObject(): Object {
    let filter = {
      id: this.form.controls['proposal'].value ? this.form.controls['proposal'].value[0].id : null,
      contract_type: this.form.controls['contract_type'].value ? this.form.controls['contract_type'].value : null,
      customer_id: this.form.controls['customer'].value ? (this.form.controls['customer'].value[0] ? this.form.controls['customer'].value[0].id : null) : null,
      contract_status: this.form.controls['contract_status'].value ? this.form.controls['contract_status'].value : null,
      proposal_status: this.form.controls['proposal_status'].value ? this.form.controls['proposal_status'].value : null,
      date: this.form.controls['date'].value ? this.form.controls['date'].value : null
    }

    return filter;
  }
}
