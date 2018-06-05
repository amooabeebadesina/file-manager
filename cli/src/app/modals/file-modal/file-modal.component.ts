import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FileService} from "../../services/file.service";
import {APIResponse} from "../../interfaces/response";

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css']
})
export class FileModalComponent implements OnInit {

    uploadedFiles = '';
    showLoading = false;

    constructor(public dialogRef: MatDialogRef<FileModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fileService: FileService) { }

    ngOnInit() {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    check($event) {
        this.uploadedFiles = $event.target.files;
    }

    onUpload() {
        this.showLoading = true;
        this.fileService.uploadFiles(this.uploadedFiles)
            .subscribe((res: APIResponse) => {
                this.showLoading = false;
                this.dialogRef.close();
            }, (err) => {
                console.log(err);
            })

    }
}
