import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import {APIResponse} from "../../interfaces/response";
import {FileModalComponent} from "../../modals/file-modal/file-modal.component";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    active =  0;
    trashed = 0;
    total = 0;

    constructor(private fileService: FileService,
                public dialog: MatDialog,
                private router: Router) { }

    ngOnInit() {
      this.fileService.getFilesCount()
          .subscribe((res: APIResponse) => {
              this.active = res.data.active;
              this.trashed = res.data.trash;
              this.total = this.active + this.trashed;
          }, (err) => {

          })
    }

    openFileModal(): void {
        let dialogRef = this.dialog.open(FileModalComponent, {
            width: '50%',
            data: {}
        });

        dialogRef.afterClosed().subscribe( () => {
            this.router.navigate(['/dashboard/active']);
        });
    }

}
