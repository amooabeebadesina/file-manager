import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    get (url) {
      return this.http.get(url, this.options());
    }

    post (url, data={}, options=this.options()) {
      return this.http.post(url, data, options)
    }

    options () {
      let authToken = this.getToken() || '';
      let headers = new HttpHeaders();
      if (authToken !== '') {
          headers = headers.append('Authorization', 'Bearer ' + authToken);
      }
      return {headers: headers};
    }

    getToken() {
        const storageData = JSON.parse(localStorage.getItem('bezop'));
        if (storageData && storageData.hasOwnProperty('token')) {
            return storageData.token;
        }
        return null;
    }

}
