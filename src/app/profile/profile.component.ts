import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public imageError: string = '';
  public isImageSaved: boolean = false;
  public cardImageBase64: string = 'data:image/webp;base64,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';


  constructor(private userService: UserService, private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.init();
    this.user = this.userService.getUser();
  }

  updateUser() {
    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
      data => {
        let response: any = data;
        this.userService.setUser(response);
        this.toastr.clear();
        this.toastr.success( 'Profile photo changed!', 'Show Up');
      },
      error => {
        this.toastr.error('Failed to perform the task!', 'Show Up');

      }
    )
  }

  removeImage() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
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
            this.user.photo = this.cardImageBase64;
            this.updateUser();
            return true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return true;
    }
    return false;
  }

}
