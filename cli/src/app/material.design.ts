import {NgModule} from "@angular/core";
import {MatDialogModule, MatProgressBarModule} from "@angular/material";

@NgModule({
    imports: [
        MatDialogModule,
        MatProgressBarModule
    ],
    exports: [
        MatDialogModule,
        MatProgressBarModule
    ]
})

export class MaterialDesign {}
