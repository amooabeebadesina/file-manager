import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {URLS} from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLoggedIn = false;
    redirectUrl: string;

    constructor(private httpService: HttpService) {
    }

    getStorageData() {
        return JSON.parse(localStorage.getItem('bezop'));
    }

    getToken() {
        const storageData = this.getStorageData();
        if (storageData.hasOwnProperty('token')) {
            return storageData.token;
        }
        return null;
    }

    loginStatus () {
        return localStorage.getItem('bezop');
    }

    setToken(token: string) {
        let storage = this.getStorageData();
        storage.token = token;
        localStorage.setItem('bezop', JSON.stringify(storage));
        this.isLoggedIn = true;
    }

    saveUserDetails(details) {
        if (this.getStorageData()) {
            this.logOut();
        }
        const data = {
            token : details.access_token,
            name: details.user.name,
            username: details.user.username,
        };
        localStorage.setItem('bezop', JSON.stringify(data));
        this.isLoggedIn = true;
    }

    login(data) {
        return this.httpService.post(URLS.LOGIN, data);
    }

    logOut() {
        localStorage.removeItem('bezop');
        this.isLoggedIn = false;
    }

}

