import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public text: string = '';
  public messageId: string | null = '';
  public message: any;
  public receiver: any;
  public isSubmit: boolean = false;
  public errors: any = [];
  public user: any;
  public hasCalledReceiver: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private validator: ValidatorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('/login');
    }
    this.user = this.userService.getUser();
    this.messageId = this.activatedRoute.snapshot.paramMap.get('id');
    setInterval(() => this.getMessage(), 2000);
  }

  getReceiver(): void {

    let params = {
      id: this.message.driverId == this.user._id ? this.message.userId : this.message.driverId
    }

    this.httpClient.post(`${environment.api}user`, params).subscribe(
      data => {
        this.receiver = data;
      },
      error => {
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }

  getMessage(): void {

    let params = {
      id: this.messageId
    }

    this.httpClient.post(`${environment.api}message`, params).subscribe(
      data => {
        if (data != this.message) {
          this.message = data;
        }
        if (!this.hasCalledReceiver) {
          this.getReceiver();
          this.hasCalledReceiver = true;
        }

      },
      error => {
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }

  submit(): void {
    this.isSubmit = true;
    this.validator.clear();
    this.validator.required(this.text, 'Message required');


    if (this.validator.errors.length > 0) {
      this.errors = this.validator.errors;
      this.isSubmit = false;
      return;
    }


    let params = {
      text: this.text,
      userId: this.user._id,
      id: this.messageId
    }

    this.httpClient.post(`${environment.api}message-update`, params).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        this.text = '';
        this.message = data;
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }
}
