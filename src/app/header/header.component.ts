import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectHistory = new EventEmitter();
  items=["4 + 5","4 * 5","5 - 1","7 / 5"];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectHistory(str:string){
    this.selectHistory.emit(str);
  }
}
