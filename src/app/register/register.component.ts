import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string = '';
  public name: string = '';
  public phone: string = '';
  public password: string = '';
  public confirm: string = '';
  public errors: string[] = [];
  public isSubmit = false;

  constructor(private httpClient: HttpClient,
    private validator: ValidatorService,
    private userService: UserService,
    private router: Router) { }

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
    this.validator.required(this.name, 'Name');
    this.validator.isPhone(this.phone);
    this.validator.isStrongPassword(this.password);
    this.validator.required(this.confirm, 'Confirm Password');
    this.validator.matched(this.password, this.confirm);

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    let params = {
      email: this.email,
      name: this.name,
      phone: this.phone,
      password: this.password,
      type: 'customer',
      photo: 'data:image/png;base64,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'
    }

    this.httpClient.post(`${environment.api}register`, params).subscribe(
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
