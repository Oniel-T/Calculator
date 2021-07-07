import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css']
})
export class ConvertorComponent implements OnInit {
  @Input() resultCal:string = ''; 
  constructor() { }

  ngOnInit(): void {
  }

}
