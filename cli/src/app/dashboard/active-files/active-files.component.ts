import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import {MatDialog} from "@angular/material";
import {FileModalComponent} from "../../modals/file-modal/file-modal.component";
import {APIResponse} from "../../interfaces/response";

@Component({
  selector: 'app-active-files',
  templateUrl: './active-files.component.html',
  styleUrls: ['./active-files.component.css']
})
export class ActiveFilesComponent implements OnInit {

    toDelete = [];
    files: any;
    error = false;

    constructor(private fileService: FileService,
                public dialog: MatDialog) { }

    ngOnInit() {
        this.fetchActiveFiles();
    }

    fetchActiveFiles () {
        this.error = false;
        this.fileService.getActiveFiles()
            .subscribe((res: APIResponse) => {
                this.files = res.data.active;
            },(err) => {
                this.error = true;
            })
    }

    toggleSelected(index) {
        if (this.toDelete.includes(index)){
            this.toDelete.splice(this.toDelete.indexOf(index), 1)
        } else {
            this.toDelete.push(index);
        }
    }

    trashFiles() {
        const data =  { id: this.toDelete};
        this.fileService.moveToTrash(data)
            .subscribe((res: APIResponse) => {
                this.fetchActiveFiles();
            }, (err) => {
                this.error = true;
            })
    }

    openFileModal(): void {
        let dialogRef = this.dialog.open(FileModalComponent, {
                            width: '50%',
                             data: {}
                        });

        dialogRef.afterClosed().subscribe( () => {
            this.fetchActiveFiles();
        });
    }

    getFileType(name): string {
        return name.split('.').pop().toUpperCase();
    }

}
