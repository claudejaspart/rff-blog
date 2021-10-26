import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-stars',
  templateUrl: './level-stars.component.html',
  styleUrls: ['./level-stars.component.css']
})
export class LevelStarsComponent implements OnInit 
{
  @Input() level : number = 0

  constructor() { }

  ngOnInit(): void {
    
  }

}
