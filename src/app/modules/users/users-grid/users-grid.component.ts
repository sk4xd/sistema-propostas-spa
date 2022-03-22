import { NgxSpinnerService } from 'ngx-spinner';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/users/user.model';
import { UsersResponse } from 'src/app/shared/models/users/users-response.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.css']
})
export class UsersGridComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  usersData: UsersResponse = {} as UsersResponse;
  loading = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.paginator = {} as MatPaginator;
    this.input = {} as ElementRef<HTMLInputElement>;
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    // fromEvent(this.input.nativeElement,'keyup')
    // .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //         this.paginator.pageIndex = 0;
    //         this.usersData$ = this.userService.getAll();
    //     })
    // )
    // .subscribe();
  }

  private loadUsers(): void {
    this.spinner.show();
    this.userService.getAll()
    .pipe(finalize((() => this.spinner.hide)))
    .subscribe((res: any) => {
      this.usersData = res;
    })
  }

  public changePage(pageChange: PageEvent): void {
    this.spinner.show();
    this.userService.getAll(pageChange.pageIndex + 1, pageChange.pageSize)
    .pipe(finalize((() => this.spinner.hide)))
    .subscribe((res: any) => {
      this.usersData = res;
    });
  }

  public openUserForm(): void {
    let dialogRef = this.dialog.open(UsersFormComponent, {
      maxHeight: '900px',
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'save')
      this.loadUsers()
    })
  }

  public editUserForm(user: User): void {
    let dialogRef = this.dialog.open(UsersFormComponent, {
      maxHeight: '900px',
      width: '900px',
      disableClose: true,
    });

    dialogRef.componentInstance.user = user;
    dialogRef.componentInstance.editing = true;

    dialogRef.afterClosed().subscribe(res => {
      if(res === 'update')
      this.loadUsers()
    })
  }
}
