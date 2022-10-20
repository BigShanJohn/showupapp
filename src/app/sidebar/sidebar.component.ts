import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {
  user: any;
  public type: string = '';
  @Input() show: boolean = true;
  @Output() hasProfileSwitched: any = new EventEmitter();
  public showSwitchProfile: boolean = false;
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
  switch() {
    this.type = this.user.type == 'customer' ? 'driver' : 'customer';
    this.showSwitchProfile = true;
    this.show = false;
  }
  logout() {
    this.userService.clearUser();
    this.show = false;
    this.router.navigateByUrl('');
  }
  onSwitch(type: any) {
    if (type) {
      console.log(type);
      this.user.type = type;
      this.userService.setUser(this.user);
    } else {
      this.type = this.user.type == 'customer' ? 'driver' : 'customer';
    }
    console.log(this.type);
    this.hasProfileSwitched.emit(true);
    this.showSwitchProfile = false;
  }
}
