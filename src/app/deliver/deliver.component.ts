import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.css']
})
export class DeliverComponent implements OnInit {
  public isSubmit: boolean = false;
  public errors: any = [];
  public item: any;
  public user: any;
  public itemId: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getItem();
  }

  getItem(): void {
    let params = {
      id: this.itemId
    }

    this.httpClient.post(`${environment.api}item`, params).subscribe(
      data => {
        this.item = data;
      },
      error => {
        this.errors = [];
        this.errors.push(error.error);
        let response: any = error;
      }
    )
  }

  openGPS() { 
    this.router.navigateByUrl('gps/'+ this.item._id);
  }
  
  submit(): void {
    this.isSubmit = true;
    this.item.mode = 'handshaked';
    this.item.driverId = this.user._id;
    this.httpClient.post(`${environment.api}item-update`, this.item).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        let response: any = data;
        this.item = response;
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }

}
