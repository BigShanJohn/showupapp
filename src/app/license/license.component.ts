import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  public driverLicenseNumber: string = '';
  public driverLicenseExpireDate: any;
  public driverLicenseState: string = '';
  public driverDateOfBirth: any;
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

    this.driverLicenseNumber = this.user.driverLicenseNumber;
    this.driverLicenseExpireDate = this.user.driverLicenseExpireDate;
    this.driverLicenseState = this.user.driverLicenseState;
    this.driverDateOfBirth = this.user.driverDateOfBirth;
  }


  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    console.log(this.driverLicenseExpireDate);
    this.validator.required(this.driverLicenseNumber, 'License Number');
    this.validator.required(this.driverLicenseExpireDate, 'Expire Date');
    this.validator.required(this.driverDateOfBirth, 'Date Of Birth');

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    this.user.driverLicenseNumber = this.driverLicenseNumber;
    this.user.driverLicenseExpireDate = this.driverLicenseExpireDate;
    this.user.driverLicenseState = this.driverLicenseState;
    this.user.driverDateOfBirth = this.driverDateOfBirth;

    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        let response: any = data;
        this.userService.setUser(response);
        this.router.navigateByUrl('/profile')
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }

}
