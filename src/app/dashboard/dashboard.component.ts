import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public Editor = ClassicEditor;
  
  constructor() { }

  ngOnInit(): void {
  }

}
