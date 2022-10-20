import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../validator.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-confirmation',
  templateUrl: './send-confirmation.component.html',
  styleUrls: ['./send-confirmation.component.css']
})
export class SendConfirmationComponent implements OnInit {

  public isSubmit: boolean = false;
  public errors: any = [];
  public item: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private validator: ValidatorService,
    private itemService: ItemService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.itemService.init();
    if (!this.itemService.getItem()) {
      this.router.navigateByUrl('/send');
    }

    this.item = this.itemService.getItem();

  }

  submit(): void {
    this.isSubmit = true;
    this.httpClient.post(`${environment.api}send`, this.item).subscribe(
      data => {
        this.isSubmit = false;
        this.errors = [];
        let response: any = data;
        this.itemService.setItem(response);
        this.router.navigateByUrl('/select-driver');
      },
      error => {
        this.isSubmit = false;
        this.errors = [];
        this.errors.push(error.error);
      }
    )
  }

}
