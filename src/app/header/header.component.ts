import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0,0,0)'
      })),
      state('closed', style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0,-100%,0)'
      })),
      transition('open => closed', animate('200ms ease-out')),
      transition('closed => open', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  show:boolean = false;
  collapse: string = 'closed'

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    //this.show = !this.show
    this.collapse = this.collapse == 'open' ? 'closed':'open';
  }

}
