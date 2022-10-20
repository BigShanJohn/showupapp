import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public user: any;
  constructor(private userService: UserService, private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.init();
    this.user = this.userService.getUser();
  }

  updateDriverArrivedNotificationInApp() {
    this.user.driverArrivedNotificationInApp = this.user.driverArrivedNotificationInApp == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateDriverArrivedNotificationInEmail() {
    this.user.driverArrivedNotificationInEmail = this.user.driverArrivedNotificationInEmail == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateMessageReceivedNotificationInApp() {
    this.user.messageReceivedNotificationInApp = this.user.messageReceivedNotificationInApp == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateMessageReceivedNotificationInEmail() {
    this.user.messageReceivedNotificationInEmail = this.user.messageReceivedNotificationInEmail == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }
  updateOrderCompletedNotificationInApp() {
    this.user.orderCompletedNotificationInApp = this.user.orderCompletedNotificationInApp == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateOrderCompletedNotificationInEmail() {
    this.user.orderCompletedNotificationInEmail = this.user.orderCompletedNotificationInEmail == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateDropOffNearByNotificationInApp() {
    this.user.dropOffNearByNotificationInApp = this.user.dropOffNearByNotificationInApp == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateDropOffNearByNotificationInEmail() {
    this.user.dropOffNearByNotificationInEmail = this.user.dropOffNearByNotificationInEmail == 'yes' ? 'no' : 'yes';
    this.updateUser();
  }

  updateUser() {
    this.httpClient.post(`${environment.api}update-user`, { user: this.user }).subscribe(
      data => {
        let response: any = data;
        this.userService.setUser(response);
        this.toastr.clear();
        this.toastr.success('Notification setting changed!', 'Show Up');
      },
      error => {
        console.log(error);
        this.toastr.clear();
        this.toastr.error('Failed to perform the task!', 'Show Up');
      }
    )
  }
}
