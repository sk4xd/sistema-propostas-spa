import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Cep } from 'src/app/shared/models/cep/cep.model';
import { Customer } from 'src/app/shared/models/customers/customer.model';
import { CepService } from 'src/app/shared/services/cep/cep.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit, AfterViewInit {

  customer!: Customer;
  editing: boolean = false;
  readonly: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthDate: new FormControl(''),
    identity: new FormControl(''),
    identityExpedition: new FormControl(''),
    cpfCnpj: new FormControl('', [Validators.required]),
    mothersName: new FormControl(''),
    fathersName: new FormControl(''),
    civilState: new FormControl(''),
    partnersName: new FormControl(''),
    partnersCPF: new FormControl(''),
    cellphone: new FormControl(''),
    phoneNumber: new FormControl(''),
    cep: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    district: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    complement: new FormControl(''),
    firstReferralName: new FormControl(''),
    firstReferralPhone: new FormControl(''),
    secondReferralName: new FormControl(''),
    secondReferralPhone: new FormControl(''),
    job: new FormControl(''),
    placeOfBirth: new FormControl(''),
    ownHouse: new FormControl(''),
    email: new FormControl(''),
    observation: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<CustomersFormComponent>,
    private customerService: CustomerService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.customer);
    if (this.readonly) {
      this.form.disable();
    }
  }

  ngAfterViewInit() {
    this.form.controls['cep'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(cep => {
      this.cepService.buscarCep(cep).subscribe((res: Cep) => {
        this.form.controls['address'].patchValue(res.logradouro);
        this.form.controls['district'].patchValue(res.bairro);
        this.form.controls['city'].patchValue(res.localidade);
        this.form.controls['complement'].patchValue(res.complemento);
        this.form.controls['state'].patchValue(res.uf);
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveCustomer(): void {
    if (this.form.valid && !this.editing){
      this.customerService.save(this.form.value).subscribe(res => {
        this.dialogRef.close('save');
      });
    }

    if (this.form.valid && this.editing){
      this.customerService.update(this.customer.id, this.form.value).subscribe(res => {
        this.dialogRef.close('update');
      });
    }
  }

}
