import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {

  public items: any;
  public user: any;

  constructor(private userService: UserService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.getIncomingOrders();
  }

  getIncomingOrders() {
    let params = {
      email: this.user.email
    }

    this.httpClient.post(`${environment.api}my-incoming-orders`, params).subscribe(
      data => {
        let response: any = data;
        this.items = response;
      },
      error => { }
    )
  }
}
