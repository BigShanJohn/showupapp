import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  public currentItems: any;
  public completedItems: any;
  public user: any;

  constructor(private userService: UserService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.getCurrentOrders();
    this.getCompletedOrders();
  }

  getCurrentOrders() {
    let params = {
      driverId: this.user._id
    }

    this.httpClient.post(`${environment.api}my-current-orders`, params).subscribe(
      data => {
        let response: any = data;
        this.currentItems = response;
      },
      error => { }
    )
  }
  getCompletedOrders() {
    let params = {
      driverId: this.user._id
    }

    this.httpClient.post(`${environment.api}my-completed-orders`, params).subscribe(
      data => {
        let response: any = data;
        this.currentItems = response;
      },
      error => { }
    )
  }

}
