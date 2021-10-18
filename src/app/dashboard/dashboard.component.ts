import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  public Editor = ClassicEditor;
  @ViewChild('listPosts') listOfPosts!:ElementRef;
  @ViewChild('mainCentral') centralPanel!:ElementRef;
  
  constructor() { }

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();
  }

  resizePostsLists():void
  {
    // calcul hauteur du container de la liste des posts existants
    let centralPanelRectBottom = Math.floor(this.centralPanel.nativeElement.getBoundingClientRect().bottom);
    let listPostsRectTop = Math.floor(this.listOfPosts.nativeElement.getBoundingClientRect().top);
    let height = centralPanelRectBottom - listPostsRectTop;
    
    this.listOfPosts.nativeElement.style.height = `${height}px`;
  }
}
