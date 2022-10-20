import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit, OnChanges {

  user: any;
  @Input() show: boolean = true;
  @Input() driver: any;
  @Output() driverSelect: any = new EventEmitter();
  constructor(private userService: UserService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.show = changes['show'].currentValue;
  }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
  }

  message() {
    this.driverSelect.emit(this.driver);
  }
  cancel() {
    this.driverSelect.emit(false);
  }

}