import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public isSubmit: boolean = false;
  public errors: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private validator: ValidatorService
  ) { }

  ngOnInit(): void {
    this.userService.init();
    if (this.userService.getUser()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.isEmail(this.email);
    this.validator.isStrongPassword(this.password);

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    let params = {
      email: this.email,
      password: this.password
    }

    this.httpClient.post(`${environment.api}login`, params).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        let response: any = data;
        this.userService.setUser(response);
        this.router.navigateByUrl('/dashboard')
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }
}
