import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public items: any;
  public user: any;

  constructor(private userService: UserService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.geHistories();
  }

  geHistories() {
    let params = {
      id: this.user._id
    }

    this.httpClient.post(`${environment.api}my-histories`, params).subscribe(
      data => {
        let response: any = data;
        this.items = response;
      },
      error => { }
    )
  }
}
