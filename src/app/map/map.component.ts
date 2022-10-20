import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  public latitude: number = 0;
  public longitude: number = 0
  public zoom: number = 0;
  address: string = '';
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef | any;

  @Output() place = new EventEmitter();
  @Input() field: any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

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

  ngOnInit() {

  }

  submit() {
    this.place.emit({
      lat: this.latitude,
      long: this.longitude,
      address: this.address,
      field: this.field,
      success: true
    })
  }

  cancel() {
    this.place.emit({
      success: false
    })
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd(data: any) {
    console.log('lat', data.latLng.lat()); //to see the latitude in the console
    console.log('lng', data.latLng.lng()); // to see the longitude in the console
    this.latitude = data.latLng.lat();
    this.longitude = data.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
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
