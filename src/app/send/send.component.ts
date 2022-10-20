import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../validator.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})

export class SendComponent implements OnInit {
  public description: string = '';
  public additionalInformation: string = '';
  public receiverName: string = '';
  public receiverEmail: string = '';
  public pickUpLocation: any;
  public dropOffLocation: any;
  public pickUpLocationAddress: string = '';
  public dropOffLocationAddress: string = '';
  public addressType: string = '';
  public imageError: string = '';
  public isImageSaved: boolean = false;
  public cardImageBase64: string = 'data:image/webp;base64,UklGRoYMAABXRUJQVlA4IHoMAADwQwCdASr6APoAPikSiEMhoSERGH1AGAKEtLdwuPB/Dm9G/G79c9+dTfX/y3q6/uXpcdE3nZdPJ3a7JbPEX8v7Pv6l+N/XjeHPWz91NI/+N/Vb6z/S/2c/L742/xvhvwAvxP+Rf138q/yQ5F8AH5B/N/9F/eP3a/yfkq+iHzM+4B/H/5j/cvzI/u/zH3vtAL+e/0P/U/3n8e/pY/gv+R/kv8F+5/tW/Lf7x/xf8v8A/8o/oH+q/Oz/Pf//6pfXV+4fsb/sB/9x9XmikYBxq82rzRSMA41ebV5opGAW1Ltel48uc9g2rzDLiITU6wmEtgqzoN0EKR2A1spICvNPV23hPjWHFVnQiXUXyyimv8YblVwHvl4J6a478cuJ5sEqrIXPrzasUMBt2QPi71uTddeZOe6hQ9XSr2T2b+Z9b8mnr74fjAoF6Bz568hBw4r8ArAD2RofBXN4UHa/LNPq/81QCs8qw+B2gpDAfJpHy81LEcxKo+5SRG26XtZT69PgucaWUYkcHHvUZ1jRndWl7VbSqSefNnSzXMKe4HBu4a3gVI6xB5ryLp0DM753iUS/TGAf07/nyZ4tuC5OJ9ej3nlskSL+xdpF7weReFbeSv53aIl6JZfiLiWcUtHXI+MhtmzaTCJb33RVeRwG5FVnP/qUMCyuHJhhrnKQCDa8H9uk3q9fsfnY1Z0I/cZkVNiAH6pCDKXV0frzavNFIwDjV5tXmikYBxq8xgAA/v/OugAAAIrJB6PCqdSmJ7W3K6O4e1ajUGJTX4Ev7jxbhM/YnxZbqu7kfOWnGPQ5PbPuaywBf+mDmheWjHobkYRP12TrTURfRUnIz/idXR39+98KMD1zlyqBuSJfd/gMZefmS9VqVzkvrGABE2gIzbTgRgtH0XvXtlXw1fAKipW1pjMJFY4kFGlJo+H8xxmPaa3Ivkvp88jnr6IJt//D6/NvET+HeFJCjq/lMVi6sdKSfAJZ/HlO/SSh8Y2OMyoRAmpDpb3YZmlZXR+lNj7xGndTBMeg5MCXJ80c48xu9za8PsNM46Aa7/C5mr35DxMmZ5/WTRyFI81BDZTwOw+zIy9RrhbGqX5qnObllpgc9AAwYq29tr3TSQE9QlJ3qn54Fv4YlQYc03S+SPlcOK5xJt+dVUucj5aAKEPaQPOcZ5NIwqwM35SOmCZEp1ZeMZPF2d2msVp8W89u1IKYXwTO5F1/Zzb0Ia/mpklLi9+fQSwJlIHcICVvBRI+ZoyVHftpWBDziad4T62aqbfI7BNBvXmqpejVrPNWTAjOz/2pB+RRxcYBrPQwQVtM6YvmaZsDAx3Qpib5/XuYDvbNNJtDIxCvsOJimHojcno8YanD7MT/zml7gPdpAAuKxypwwlRH6INJf5OJQhojJXMHR55r4eBAY8PVjdOPwgDaPTEADNYzbtewkIvSntqk0QH4emEMhmQ8kuAsmm/EGZphkyHe9eOXJxe7os2zJEDLBgBeEoAAtxUJ1XRGQS3w2l0e/FPXZlN0gzm14KLt6bufnM+Kx0YpRSPn9l5SOKSAMXYwGePuUCq/DUGUoQT0nLuT/QzgDYlMVphoeuObmHCDalwBCDwGmaTFnoS5N11fEM/Ot8k7XXWitJEcuF2fCLgOp6mMgq+NOnROnoVZb61ZKxz2LgFMQIAd0QjT48wD0NBHIEMPENWe6M5ryw1EqsR8USFOAnmKmdX9UQP/4CxWilneTLLqE32/WnAFOHDAu9Tbeugj1L+ydvZq0WUj6tTlgvcUZ9CDX3N8b/szkaAeR9VyD15vSeMtYRPCGaTMlXyJQ9IInl6kfHI4R5VPMXQK7Z9WnFIx+3zWPH6EnNmHibaEnZJKHv5kLVmBJrSNzLZTmgZqb+sv689g9csJCj8dA+uvx74uvDbJj5fVf24UoFH+tbHnZtjQKr2fdZhhSJH7QdRFmuknxTkIz9rBjBKwM/yJqkeP8UtX3ZE+wZ4MrtV3Wi5MY6ULKnA6gZCtfNu+SlaT5/dxOOCf3SwTvE5Dv7fByh8CGgMWrI344Csx05EHSeBICqNZHNssKRznkVSEZPGHbhkUj5D210bOCPhX+nv+e13IQcOY1pFsRuP9QMmJYY0NVyruyF4jGx2N/v0knGlKIdyo3lCEtBCAsrU7qq5yO/DiPMfC1pLThDVqOfAAgLKeQDlvHwfm+dRTvkb1bkTifPmeTWeo1Q5MaVfpPf82tpCfDWTzzw+5mc2g7HTRBNehvJZAJlmrdbLmVu2l3KJ0a9O9ofD2BsumFRcCSBw1ZyNScm9tLxr/YP6cwxmBbZ9mYivKp46TFBQGlRObgOtFMGZ1ObvUyBuUIuqlI5B1Lb3GbTHOzfhk6rMXywJWnefT41HP1Xe214RIpGgDofaNoWbrt2gXM/4yalxTLlC3hkXb70uqfAnQrXw3ganiBTkJT3I4XguA8McxCnsmFRo9X1e+CyNzNk0sBiYaVv5o5pPft6YLMSS1XECzVwNY3hfDDMrJY+qVrcbQQweRBzij1vaCHWheXxnWSO12hZkhMLemLJdVPkiMu124JlQ5zT5Hw5LIe0sGGQW0gAdLziXzYp6C8EBc2lLjilwDUuKCwZDegnEOmWg7ywgn97/+fpnI7p1/x/w4OoqCTxnkTutn1yhmLWmT97XxgaiwvfMSWfLVsHuIKrykz4nYwwzCCRAHbw81SaKxLPXhsMFboKvvLd5HPnn6FQInE178rS8klMpwYJmCXEbR4dLAMml7TPbldK+XdfjLdx8tvf5okgsXizvW5ft018CZcwnPaET7hApPVLe/z+MBiuRpPXMld8xtA41mo/yq62Cn5DNavrP42l16mZ9IJnBKZ3AIA5CiigZrD3DLz4aj8U/V/iW73l9QQRtZGw7g3Glmp0r809Ptb+ByfQNt6otRG4t97JrBw1mK3gK1UkTRLeSHTqtpY5e2FHqtOn8WsZJSeWTAvkN0Ll7PrTkSekxr50IGZnod3RnfoLuwR7E0vJOPcYHQG8HP5wrxKtRnDZZcmiMy37uoq6aRUMGaBrD229zT/8Fc/DD4glZ/0vb5P1voNErX68NXr6IW6RCgRyGqTS8oLHDM0d7jLk87iR5ArCwVe8OTwgFg/86zb5CSZ1Mc35sXFIzwWcFRmv7KIVQNu1w31r4Hb35nDh8ryTWbG3VVW2EDda2GrgIbpmopKiVcts+kes+qYrNHF8L3E0BD/rm5odQ0t4rGWKB+ew5Vju+HFsz+y2SGHCCLgL+ExIdr78Mqc1oaovOQSd5zuSsbZj0ELijk8K8A6GgklmquR3BWeYoA53TMIlMzU6KP+MdSw7s+BeHO/Yl2wpH1fjdVfZHU0IriVSAULIdKgL/a8eJXhawnMHQ3aFAHy8SLQ+vNO2dD36sQiAathYviOUfO7BNiBu8tVOP7TPWV/jwizCZxqZwBnJfyZFywkYG4+K+NVlvttGunAeLRBjDMBUoQ4wcKf3B66rjDZsmqW7HdtYuJqFtgYbuO+dS9Afowc66SWkCodu7fv7oM0W8ZXy1MEDiSQOeSniG+O2w7GKgzglxLR/+MhWwnUC/ur7SpCo4RP/6pfNZCgD8s9gtAXCDeoOdHigjEOY6QW99MoiWDSv+tNJ4TX6dUtrUhsRU3agj3Tg89h7hGjjh5XR1u/VC1e+7SV63bunmomXUuyThBPJFvjHHFmUwsev5f5w5jMxltv3+q7nRo4YE7XgjSreOQQ0MlseHJiOWiKxvwO9DA/FjFIeBLdxGwmGSQLmFiQrV4ExeivOyiEm+AnDpCn88R9ZDCcVsrKMyLWdycDqS064AapUlpBRbin0YakK1Sxh6KnFpZBtlTX8OBNlABhOf1eN9Sg6pEbCk8gvWwg1PYKYL7cCzjDunXQ89uHK0Xr2e44/869B163kMY9mVfEozJojQyfv6jltIpGLgyi/XOxzaM88KBPGG0TRkQqNFSUW//kmwHPkeIHiQqaE1FKnRWmd5Qc4iO74wr5ruTM+UqqKgcBsuh7AzvfkfakBa1wzIed9vlaM8dUWG2G1/870Jsx7WBL3jUlWp7Mx1CbHccXJRrAHEwsjFN89OtJlA1VP3/AZ0nlhdBJn/WaeGXaLIwLjZ2xMMGezAybeNm0uI73bjEdBavkLlw6c7074LAEKPhYfWi473i6w56wIXtJhQ3wjKdfYW+a53gpBnH+qyn+zHIW1xDg8yWF4sPrn2pOOffrHXF1EN0AUZmuAaB2LS0Af+nGfERYAAVWm+EyBE26tAAAAAAAA==';
  public isSubmit: boolean = false;
  public errors: any = [];
  public user: any;
  public item: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private validator: ValidatorService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.itemService.init();
    this.item = this.itemService.getItem();
    if (this.item) {
      this.description = this.item.description;
      this.cardImageBase64 = this.item.photo;
      this.additionalInformation = this.item.additionalInformation;
      this.receiverName = this.item.receiverName;
      this.receiverEmail = this.item.receiverEmail;
      this.pickUpLocation = this.item.pickUpLocation;
      this.dropOffLocation = this.item.dropOffLocation;
      this.pickUpLocationAddress = this.pickUpLocation.address;
      this.dropOffLocationAddress = this.dropOffLocation.address;
    }
  }

  pickUpAddress() {
    this.addressType = 'pick-up';
    $("#set-address").modal('show');
  }
  
  dropOffAddress() {
    this.addressType = 'drop-off';
    $("#set-address").modal('show');
  }

  onPlacePicked(data: any) {
    console.log(data);
    if (data.success) {
      if (data.field == 'pick-up') {
        this.pickUpLocation = {
          lat: data.lat,
          long: data.long,
          address: data.address
        }
        this.pickUpLocationAddress = data.address;

      }
      else if (data.field == 'drop-off') {
        this.dropOffLocation = {
          lat: data.lat,
          long: data.long,
          address: data.address
        }
        this.dropOffLocationAddress = data.address;
      }
    }
    $("#set-address").modal('hide');
  }

  uploadPhoto() {
    $("#file-upload").click();
  }

  fileChangeEvent(fileInput: any): boolean {
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any): void => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            return true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return true;
    }
    return false;
  }

  distance(lat1: number, lat2: number, lon1: number, lon2: number) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
  }

  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.required(this.description, 'Description');
    this.validator.isEmail(this.receiverEmail);
    this.validator.required(this.pickUpLocationAddress, 'Pick Up Location Address');
    this.validator.required(this.dropOffLocationAddress, 'Drop Off Location Address');

    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }

    let distanceInMile = this.distance(this.pickUpLocation.lat, this.dropOffLocation.lat, this.pickUpLocation.long, this.dropOffLocation.long)
    let item = {
      description: this.description,
      photo: this.cardImageBase64,
      additionalInformation: this.additionalInformation,
      receiverName: this.receiverName,
      receiverEmail: this.receiverEmail,
      pickUpLocation: this.pickUpLocation,
      dropOffLocation: this.dropOffLocation,
      coordinates: [this.pickUpLocation.lat, this.pickUpLocation.long],
      distance: distanceInMile.toFixed(2),
      fee: (distanceInMile  * environment.feePerMile).toFixed(2),
      time: (distanceInMile * environment.timePerMile).toFixed(2),
      mode: 'initiated',
      authorId: this.user._id,
      driverId: ''
    }
    this.itemService.init();
    this.itemService.setItem(item);
    this.isSubmit = false;
    this.router.navigateByUrl('send-confirm');
  }
  removeImage() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
  }
}
