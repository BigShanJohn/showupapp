import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Functions } from '../function';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public showSideBar: boolean = false;
  public showGetStarted: boolean = false;
  public items: any;
  public user: any;
  public functions: any = new Functions();
  public latitude: number = 0;
  public longitude: number = 0
  public cordinateInterval: any;
  public locationError: any

  constructor(private userService: UserService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    if (this.user.type == 'customer') {
      this.getActiveOrders();
    } else {
      if (!this.user.driverLicenseNumber) {
        this.showGetStarted = true;
      } else {
        this.setCurrentLocation();
        this.cordinateInterval = window.setInterval(() => { this.setCurrentLocation() }, 30000);
      }
    }
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.user.latitude = this.latitude;
          this.user.longitude = this.longitude;
          this.user.coordinates = [this.latitude, this.longitude];
          this.updateUser();
          this.getNearByOrders();
        },
        (error) => {
          this.locationError = error.message;
        }
      );
    }
  }

  updateUser() {
    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
      data => {
        let response: any = data;
        this.userService.setUser(response);
      },
      error => { }
    )
  }

  onHasProfileSwitched(data: any) {
    if (data) {
      this.userService.init();
      this.user = this.userService.getUser();
      if (this.user.type == 'customer') {
        this.getActiveOrders();
        clearInterval(this.cordinateInterval);
      }
      else {
        if (!this.user.driverLicenseNumber) {
          this.showGetStarted = true;
        }
        if (!this.cordinateInterval) {
          this.setCurrentLocation();
          window.setInterval(() => { this.setCurrentLocation() }, 30000);
        }
      }
    }
  }

  onGetStarted(data: any) {
    if (data) {
      this.router.navigateByUrl('first');
    }
  }

  deliver(id: any) {
    this.router.navigateByUrl('deliver/' + id);
  }

  getActiveOrders() {
    let params = {
      id: this.user._id
    }

    this.httpClient.post(`${environment.api}my-active-order`, params).subscribe(
      data => {
        let response: any = data;
        this.items = response;
      },
      error => { }
    )
  }

  getNearByOrders() {
    let params = {
      id: this.user._id,
      lat: this.user.latitude,
      long: this.user.longitude,
      distance: 300
    }

    this.httpClient.post(`${environment.api}my-nearby-order`, params).subscribe(
      data => {
        let response: any = data;
        if (this.items != response)
          this.items = response;
      },
      error => { }
    )
  }

}