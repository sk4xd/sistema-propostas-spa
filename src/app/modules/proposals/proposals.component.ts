import { Component, OnInit } from '@angular/core';

export interface Proposta {
  name: string;
}

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})

export class ProposalsComponent implements OnInit {


  propostasData = {
    data: [] as Proposta[],
    total: 0
  };
  proposta = {};

  constructor() { }

  ngOnInit(): void {
  }

  editPropostaForm({}): void {

  }

  changePage({}) {

  }

}
