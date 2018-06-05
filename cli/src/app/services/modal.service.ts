import { Injectable } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    constructor() { }

    launchFileModal() {
        $('#newFileModal').show();
        console.log('aww');
    }

}
