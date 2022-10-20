import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit, AfterViewInit {
  public hasLoaded: boolean = false;
  public latitude: number = 0;
  public longitude: number = 0
  public zoom: number = 0;
  address: string = '';
  public item: any;
  public user: any;
  itemId: any;
  public isSubmit: boolean = false;
  public errors: any = [];
  public origin: any;
  public destination: any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.origin = { lat: parseFloat(this.user.latitude), lng: parseFloat(this.user.longitude) };
    this.destination = { lat: parseFloat(this.user.latitude), lng: parseFloat(this.user.longitude) };
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    window.setInterval(() => { this.setCurrentLocation() }, 3000);
  }

  ngAfterViewInit() {
    this.getItem();
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
          this.user.coordinates = [this.user.latitude, this.user.longitude];
          this.origin = { lat: parseFloat(this.user.latitude), lng: parseFloat(this.user.longitude) };
          this.updateUser();
        },
        (error) => {
          this.errors.push(error.message);
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

  getItem(): void {
    let params = {
      id: this.itemId
    }

    this.httpClient.post(`${environment.api}item`, params).subscribe(
      data => {
        this.item = data;
        this.mapsAPILoader.load().then(() => {
          this.destination = { lat: parseFloat(this.item.dropOffLocation.lat), lng: parseFloat(this.item.dropOffLocation.long) };
          this.zoom = 12;
          this.hasLoaded = true;
        });
      },
      error => {
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }



}
