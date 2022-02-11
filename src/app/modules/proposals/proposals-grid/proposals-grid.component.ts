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
  proposta = {};

  constructor(
    public dialog: MatDialog,
    private proposalsService: ProposalsService
  ) {
    this.paginator = {} as MatPaginator;
    this.input = {} as ElementRef<HTMLInputElement>;
   }

  ngOnInit(): void {
    this.loadProposals()
  }

  editPropostaForm({}): void {

  }

  public changePage(pageChange: PageEvent): void {
    this.loading = true;
    this.proposalsService.getAll(pageChange.pageIndex + 1, pageChange.pageSize).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res: any) => {
      this.propostasData = res;
    });
  }

  private loadProposals(): void {
    this.loading = true;
    this.proposalsService.getAll()
    .pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res:any) => {
      this.propostasData = res;
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

}
