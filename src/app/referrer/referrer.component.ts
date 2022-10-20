import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referrer',
  templateUrl: './referrer.component.html',
  styleUrls: ['./referrer.component.css']
})
export class ReferrerComponent implements OnInit {
  public user: any;
  public copiedText: string = '';
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.init();
    this.user = this.userService.getUser();
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSuccess(e: any) {
    this.copiedText = e.text;
    this.toastr.success( 'Text Copied!', 'Show Up');
  }

  onError(e: any) {
    this.copiedText = '';
    this.toastr.success( 'Error!', 'Show Up');
  }
}
