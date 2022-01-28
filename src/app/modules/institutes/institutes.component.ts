import { Institute } from './../../shared/models/institutes/institute.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit {

  institutes: Institute[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
