import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.css']
})
export class SelectDriverComponent implements OnInit, AfterViewInit {
  public hasLoaded: boolean = false;
  public latitude: number = 0;
  public longitude: number = 0
  public zoom: number = 0;
  address: string = '';
  private geoCoder: any;
  public users: any;
  public item: any;
  public user: any;
  public showDriverInfo: boolean = false;
  public driver: any;

  @ViewChild('search')
  public searchElementRef: ElementRef | any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private itemService: ItemService,
    private ngZone: NgZone
  ) {

  }

  ngOnInit() {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.itemService.init();
    if (!this.itemService.getItem()) {
      this.router.navigateByUrl('/send');
    }
    this.item = this.itemService.getItem();
  }

  ngAfterViewInit() {

    this.mapsAPILoader.load().then(() => {
      console.log(this.item);
      this.latitude = this.item.pickUpLocation.lat;
      this.longitude = this.item.pickUpLocation.long;
      this.geoCoder = new google.maps.Geocoder;
      this.zoom = 12;
      this.getAddress(this.latitude, this.longitude);
      this.neareast();


      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);

        });
      });
    });
  }



  neareast() {
    let params = {
      lat: this.latitude,
      long: this.longitude,
      distance: 300
    }

    this.httpClient.post(`${environment.api}nearest`, params).subscribe(
      data => {
        let response: any = data;
        this.users = response;
        this.hasLoaded = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  viewDriver(user: any) {
    this.showDriverInfo = true;
    this.driver = user;
  }

  onDriverSelect(data: any) {
    if (data) {
      let params = {
        userId: this.user._id,
        userPhoto: this.user.photo,
        userName: this.user.name,
        driverId: data._id,
        driverPhoto: data.photo,
        driverName: data.name,
        itemId: this.item._id
      }

      this.httpClient.post(`${environment.api}message-add`, params).subscribe(
        data => {
          let response: any = data;
          this.router.navigateByUrl('/message/' + response._id);
          this.showDriverInfo = false;
        },
        error => {
          console.log(error);
          this.showDriverInfo = false;
        }
      )
    }


  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
