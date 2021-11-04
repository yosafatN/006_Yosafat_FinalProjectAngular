import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Output() logoutListener = new EventEmitter()

  ngOnInit(): void {
  }

  logout() {
    this.logoutListener.emit()
  }
}
