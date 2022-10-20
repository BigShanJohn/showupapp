import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  @Input() show: Boolean = false;
  @Output() start: any = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onStarted() {
    this.show = false;
    this.start.emit(true);
  }

}
