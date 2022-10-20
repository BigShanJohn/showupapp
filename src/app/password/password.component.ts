import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public password: string = '';
  public newPassword: string = '';
  public confirm: string = '';
  public errors: string[] = [];
  public isSubmit = false;
  public user: any;

  constructor(private httpClient: HttpClient,
    private validator: ValidatorService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
  }


  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.isStrongPassword(this.password);
    this.validator.isStrongPassword(this.newPassword);
    this.validator.required(this.confirm, 'Confirm Password');
    this.validator.matched(this.newPassword, this.confirm);

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    let params = {
      password: this.password,
      newPassword: this.newPassword,
      id: this.user._id
    }

    this.httpClient.post(`${environment.api}change-password`, params).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        this.userService.clearUser();
        this.router.navigateByUrl('');
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }

}
