import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {URLS} from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(private httpService: HttpService) { }

    getFilesCount() {
        return this.httpService.get(URLS.FILE_COUNT);
    }

    getActiveFiles() {
        return this.httpService.get(`${URLS.GET_FILES}?q=active`);
    }

    getTrashedFiles() {
        return this.httpService.get(`${URLS.GET_FILES}?q=trash`);
    }

    moveToTrash(data) {
        return this.httpService.post(URLS.MOVE_TO_TRASH, data);
    }

    retrieveFromTrash(data) {
        return this.httpService.post(URLS.RESTORE_FILES, data);
    }

    uploadFiles(files) {
        let formData = new FormData();
        for (let i = 0; i< files.length; i++) {
            formData.append('file'+i, files[i]);
        }
        return this.httpService.post(URLS.FILE_UPLOAD, formData);
    }
}
