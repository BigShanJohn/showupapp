import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switch-profile',
  templateUrl: './switch-profile.component.html',
  styleUrls: ['./switch-profile.component.css']
})
export class SwitchProfileComponent implements OnInit, OnChanges {

  user: any;
  @Input() showSwitchProfile: boolean = true;
  @Input() type: string = '';
  @Output() switch: any = new EventEmitter();
  constructor(private userService: UserService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.showSwitchProfile = changes['showSwitchProfile'].currentValue;
  }

  ngOnInit(): void {
    this.userService.init();
    if (!this.userService.getUser()) {
      this.router.navigateByUrl('');
    }
    this.user = this.userService.getUser();
  }

  continue() {
    this.switch.emit(this.type);
  }
  cancel() {
    this.switch.emit(false);
  }

}
