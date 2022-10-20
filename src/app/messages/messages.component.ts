import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public text: string = '';
  public messages: any;
  public errors: any = [];
  public user: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('/login');
    }
    this.user = this.userService.getUser();
    setInterval(() => this.getUserMessages(), 2000);
  }

  chat(id: any) {
    this.router.navigateByUrl('message/' + id);
  }

  getLastMessage(messages: any) {
    return  messages[messages.length - 1] ;
  }

  getUserMessages(): void {

    let params = {
      userId: this.user._id
    }

    this.httpClient.post(`${environment.api}user-messages`, params).subscribe(
      data => {
        if (data != this.messages) {
          this.messages = data;
        }

      },
      error => {
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }
}
