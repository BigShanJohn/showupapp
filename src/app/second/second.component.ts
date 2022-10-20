import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  public insuranceVin: string = '';
  public insuranceEffectiveSince: string = '';
  public insuranceEffectiveUntil: string = '';
  public issured: string = '';
  public errors: string[] = [];
  public isSubmit = false;
  public user: any;

  constructor(private httpClient: HttpClient,
    private validator: ValidatorService,
    private userService: UserService,
    private router: Router) { }

  public datePickerConfig = {
    format: 'YY-MM-DD',
    theme: "dp-material"
  };

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.insuranceVin = this.user.insuranceVin;
    this.insuranceEffectiveSince = this.user.insuranceEffectiveSince;
    this.insuranceEffectiveUntil = this.user.insuranceEffectiveUntil;
    this.issured = this.user.issured;
  }


  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.required(this.insuranceVin, 'VIN');
    this.validator.required(this.insuranceEffectiveSince, 'EEffective Since');
    this.validator.required(this.insuranceEffectiveUntil, 'Effective Until');
    this.validator.required(this.issured, 'Issured');

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    this.user.insuranceVin = this.insuranceVin;
    this.user.insuranceEffectiveSince = this.insuranceEffectiveSince;
    this.user.insuranceEffectiveUntil = this.insuranceEffectiveUntil;
    this.user.issured = this.issured;

    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        let response: any = data;
        this.userService.setUser(response);
        this.router.navigateByUrl('/third')
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }
}
