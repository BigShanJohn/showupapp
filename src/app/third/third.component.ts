import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {
  public registrationVin: string = '';
  public registedOwner: string = '';
  public registrationLicenseNumber: string = '';
  public make: string = '';
  public model: string = '';
  public year: string = '';
  public errors: string[] = [];
  public isSubmit = false;
  public user: any;

  constructor(private httpClient: HttpClient,
    private validator: ValidatorService,
    private userService: UserService,
    private router: Router) { }
  public datePickerConfig = {
  };

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.registrationVin = this.user.registrationVin;
    this.registedOwner = this.user.registedOwner;
    this.registrationLicenseNumber = this.user.registrationLicenseNumber;
    this.make = this.user.make;
    this.model = this.user.model;
    this.year = this.user.year;
  }


  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.required(this.registrationVin, 'VIN');
    this.validator.required(this.registedOwner, 'Regstered Owner');
    this.validator.required(this.registrationLicenseNumber, 'Registration License Number');
    this.validator.required(this.make, 'Make');
    this.validator.required(this.model, 'Model');
    this.validator.required(this.year, 'Year');

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    this.user.registrationVin = this.registrationVin;
    this.user.registedOwner = this.registedOwner;
    this.user.registrationLicenseNumber = this.registrationLicenseNumber;
    this.user.make = this.make;
    this.user.model = this.model;
    this.user.year = this.year;

    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
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
      }
    )
  }

}
