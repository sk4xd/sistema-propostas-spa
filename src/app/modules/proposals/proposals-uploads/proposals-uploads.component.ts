import { ProposalsService } from './../../../shared/services/proposals/proposals.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ProposalUpload } from 'src/app/shared/models/proposals/proposal-upload.model';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-proposals-uploads',
  templateUrl: './proposals-uploads.component.html',
  styleUrls: ['./proposals-uploads.component.css']
})
export class ProposalsUploadsComponent implements OnInit {

  proposal_id!: number;
  uploads!: ProposalUpload[];
  files!: any[];
  indexesToRemove: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProposalsUploadsComponent>,
    private proposalsService: ProposalsService
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close(this.indexesToRemove);
  }

  downloadUpload(upload_id: string): void {
    this.proposalsService.downloadUpload(this.proposal_id, upload_id).subscribe(res => {
      let fileNameToFormat = res.filename.split('=');
      let formattedFileName = fileNameToFormat[1].substring(1, fileNameToFormat[1].length);
      importedSaveAs(res.body, `${formattedFileName}`);
    });
  }

  removeUpload(id: string): void {
    this.proposalsService.deleteUpload(this.proposal_id, id).subscribe(res => {
      this.uploads.splice(this.uploads.findIndex(upload => upload.id === id), 1);
    });
  }

  removeFile(fileRemoved: any): void {
    this.files.splice(this.files.findIndex(file => file.name === fileRemoved.name), 1);
  }
}
