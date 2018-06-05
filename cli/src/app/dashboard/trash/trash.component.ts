import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import {APIResponse} from "../../interfaces/response";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

    toRestore = [];
    files: any;
    error = false;
    successMsg = '';

    constructor(private fileService: FileService) { }

    ngOnInit() {
        this.fetchTrashedFiles();
    }

    fetchTrashedFiles () {
        this.error = false;
        this.fileService.getTrashedFiles()
            .subscribe((res: APIResponse) => {
                this.files = res.data.trash;
            }, (err) => {
                this.error = true;
            })
    }

    toggleSelected(index) {
        if (this.toRestore.includes(index)){
            this.toRestore.splice(this.toRestore.indexOf(index), 1)
        } else {
            this.toRestore.push(index);
        }
    }

    restore() {
        const data = {id: this.toRestore};
        this.fileService.retrieveFromTrash(data)
            .subscribe((res: APIResponse) => {
                this.fetchTrashedFiles();
                this.displaySuccess('Successfully restored');
            }, (err) => {
                this.error = true;
            })
    }

    displaySuccess(msg) {
        this.successMsg = msg;
        setTimeout(() => {
            this.successMsg = '';
        }, 2000)
    }

    getFileType(name): string {
        return name.split('.').pop().toUpperCase();
    }

}
