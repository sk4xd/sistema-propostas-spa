import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";
import { Institute } from 'src/app/shared/models/institutes/institute.model';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { Customer } from './../../../shared/models/customers/customer.model';
import { ProposalUpload } from './../../../shared/models/proposals/proposal-upload.model';
import { Proposal } from './../../../shared/models/proposals/proposal.model';
import { Status } from './../../../shared/models/proposals/status.model';
import { ProposalsService } from './../../../shared/services/proposals/proposals.service';
import { CustomersFormComponent } from './../../customers/customers-form/customers-form.component';
import { ProposalsUploadsComponent } from './../proposals-uploads/proposals-uploads.component';

export const comissionPercentValidation:  ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if(control.get('comission_value')?.value && control.get('final_value')?.value){
  const comissionValue = Number(control.get('comission_value')?.value.replace(/\,/, '.'));
  const finalValue = Number(control.get('final_value')?.value.replace(/\,/, '.'));
  if (comissionValue > finalValue) {
    return { invalidComission: true }
  }}
  return null;
};

export const feePercentValidation:  ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const percent = control.get('fee');
  if (percent?.value > 100) {
    control.get('fee')?.setValue(100);
    return { invalidPercent: true }
  }
  return null;
};

@Component({
  selector: 'app-proposals-form',
  templateUrl: './proposals-form.component.html',
  styleUrls: ['./proposals-form.component.css']
})
export class ProposalsFormComponent implements OnInit, AfterContentInit {

  proposal: Proposal = {} as Proposal;
  editing: boolean = false;
  uploads: ProposalUpload[] = [];
  myFiles:any [] = [];
  private contractUpload:string = "";
  customers: Customer[] = [];
  statuses: Status[] = [];
  selectedCustomer: Customer[] = [];
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

  institutes: Institute[] = [];
  selectedInstitute: Institute[] = [];
  institutesDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'institute_name',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    placeholder: 'Selecione',
    searchPlaceholderText: 'Buscar',
    noDataAvailablePlaceholderText: 'Não há dados'
  };

  form: FormGroup = new FormGroup({
    contract_type: new FormControl('', [Validators.required]),
    operation_data: new FormControl('', [Validators.required]),
    reproval_description: new FormControl(''),
    final_value: new FormControl(''),
    fee: new FormControl('',),
    comission_value: new FormControl(''),
    comission_percentage: new FormControl(''),
    contract_status: new FormControl(''),
    contract_upload: new FormControl(''),
    contract_description: new FormControl(''),
    file_description: new FormControl(''),
    files: new FormControl(''),
    institute: new FormControl(''),
    customer: new FormControl(''),
    status: new FormControl('')
  }, {
    validators: [comissionPercentValidation, feePercentValidation]
  });

  constructor(
    public dialogRef: MatDialogRef<ProposalsFormComponent>,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private proposalsService: ProposalsService
  ) { }

  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.fillCustomers();
    this.fillInstitutes();
    this.fillStatus();
    this.findAllUploads();
    this.checkComissionValue();
  }

  ngAfterContentInit() {
    if (this.editing) {
      this.form.patchValue(this.proposal);
      this.form.controls['status'].setValue(this.proposal.status.id?.toString());
      this.proposal.customer.cpfCnpj = this.proposal.customer.cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      this.selectedCustomer.push(this.proposal.customer);
      if (this.proposal.institute)
      this.selectedInstitute.push(this.proposal.institute);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveProposal(): void {
    if (this.form.valid && !this.editing){
      const formatedData = Object.assign(this.form.value, {
        ...this.form.value,
        customer_id: this.form.controls['customer'].value[0].id,
        status_id: Number(this.form.controls['status'].value)
      })
      this.proposalsService.save(formatedData).subscribe(res => {
        const id = res.id;
        this.uploadFiles(id);
        this.dialogRef.close('save');
      });
    }

    if (this.form.valid && this.editing){

      const formatedData = Object.assign(this.form.value, {
        ...this.form.value,
        customer_id: this.form.controls['customer'].value[0].id,
        status_id: Number(this.form.controls['status'].value),
        institute_id: this.form.controls['institute'].value ? this.form.controls['institute'].value[0].id : null
      })

      if (!formatedData.institute_id) {
        delete formatedData.institute_id;
      }

      this.proposalsService.update(this.proposal.id.toString(), formatedData).subscribe(res => {
        this.uploadFiles(this.proposal.id);
        this.uploadContract(this.proposal.id);
        this.dialogRef.close('update');
      });
    }
  }

  fillInstitutes(): void {
    this.proposalsService.getAllInstitutes().subscribe(res => {
      this.institutes = res.data;
    })
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

  openCustomerInfo(): void {
    let dialogRef = this.dialog.open(CustomersFormComponent, {
      maxHeight: '900px',
      width: '900px',
      disableClose: true,
    });

    let customerIndex = this.customers.findIndex(c => c.id === this.selectedCustomer[0].id);
    dialogRef.componentInstance.customer = this.customers[customerIndex];
    dialogRef.componentInstance.editing = false;
    dialogRef.componentInstance.readonly = true;
  }

  openUploadsInfo(): void {
    let dialogRef = this.dialog.open(ProposalsUploadsComponent, {
      maxHeight: '900px',
      width: '900px',
      disableClose: true,
    });

    dialogRef.componentInstance.files = this.myFiles;
    dialogRef.componentInstance.uploads = this.uploads;
    dialogRef.componentInstance.proposal_id = this.proposal.id;
  }

  onFileChange(event:any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  onContractChange(event:any) {
    this.contractUpload = event.target.files[0];
  }

  uploadFiles(id: number){
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("documents", this.myFiles[i]);
    }
    if(this.myFiles.length > 0)
    this.proposalsService.uploadFiles(id, formData).subscribe(res => {});
  }

  uploadContract(id: number) {
    const formData = new FormData();
    formData.append("contract", this.contractUpload);

    if(this.contractUpload)
    this.proposalsService.uploadContract(id, formData).subscribe(res => {});
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  findAllUploads(): void {
    if(this.proposal?.id)
    this.proposalsService.getAllUploads(this.proposal.id).subscribe(res => {
      this.uploads = res;
    })
  }

  downloadContract(): void {
    this.proposalsService.downloadContract(this.proposal.id).subscribe(res => {
      let fileNameToFormat = res.filename.split('=');
      let formattedFileName = fileNameToFormat[1].substring(1, fileNameToFormat[1].length);
      let blob = new Blob([res.body], { type: res.body.type })
      importedSaveAs(blob, `${formattedFileName}`);
    });
  }

  removeContract(): void {
    this.form.controls['contract_upload'].reset('');
    this.contractUpload = '';
    this.proposal.contract_upload = '';
  }

  checkComissionValue(): void {
    this.form.controls['comission_value'].valueChanges.subscribe(value =>{
      let finalValue = this.stringToNumber(this.form.controls['final_value'].value)
      this.form.controls['comission_percentage'].setValue(((this.stringToNumber(value) / finalValue) * 100).toFixed(6))}
    )

    this.form.controls['final_value'].valueChanges.subscribe(value =>{
      let comissionValue = this.stringToNumber(this.form.controls['comission_value'].value);
      this.form.controls['comission_percentage'].setValue(((comissionValue / this.stringToNumber(value)) * 100).toFixed(6))}
    )
  }

  stringToNumber(value: string): number {
    if(value)
    return Number(value.replace(/\,/, '.'));

    return 0;
  }
}
