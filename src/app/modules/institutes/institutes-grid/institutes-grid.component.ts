import { InstitutesService } from 'src/app/shared/services/institutes/institutes.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InstitutesResponse } from './../../../shared/models/institutes/institutes-response.model';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { InstitutesFormComponent } from '../institutes-form/institutes-form.component';
import { Institute } from 'src/app/shared/models/institutes/institute.model';

@Component({
  selector: 'app-institutes-grid',
  templateUrl: './institutes-grid.component.html',
  styleUrls: ['./institutes-grid.component.css']
})
export class InstitutesGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  institutesData: InstitutesResponse = {} as InstitutesResponse;
  loading = false;

  constructor(
    private institutesService: InstitutesService,
    public dialog: MatDialog
  ) {
    this.paginator = {} as MatPaginator;
    this.input = {} as ElementRef<HTMLInputElement>;
  }

  ngOnInit(): void {
    this.loadInstitutes();
  }

  private loadInstitutes(): void {
    this.loading = true;
    this.institutesService.getAll()
    .pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res:any) => {
      this.institutesData = res;
    })
  }

  public changePage(pageChange: PageEvent): void {
    this.loading = true;
    this.institutesService.getAll(pageChange.pageIndex + 1, pageChange.pageSize).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res: any) => {
      this.institutesData = res;
    });
  }

  public openInstituteForm(): void {
    let dialogRef = this.dialog.open(InstitutesFormComponent, {
      maxHeight: '900px',
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'save')
      this.loadInstitutes()
    })
  }

  public editInstituteForm(institute: Institute): void {
    let dialogRef = this.dialog.open(InstitutesFormComponent, {
      maxHeight: '900px',
      width: '600px',
      disableClose: true,
    });

    dialogRef.componentInstance.institute = institute;
    dialogRef.componentInstance.editing = true;

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'update')
      this.loadInstitutes()
    })
  }

}
