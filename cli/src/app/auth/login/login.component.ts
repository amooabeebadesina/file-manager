import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {APIResponse} from "../../interfaces/response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';
    errors = [];
    errMsg = '';

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {

    }

    submitForm() {
        this.errMsg = '';
        const data = {
            email: this.email,
            password: this.password
        };
        this.authService.login(data)
            .subscribe((res: APIResponse) => {
                if (!res.status) {
                    this.errMsg = 'Incorrect Credentials';
                } else {
                    this.authService.saveUserDetails(res.data);
                    this.router.navigate(['/dashboard']);
                }
            }, (err) => {
                this.errors = err.error.errors;
            })
    }

    inputsInvalid() {
        return (this.email.length < 5 || this.password.length < 1);
    }
}


