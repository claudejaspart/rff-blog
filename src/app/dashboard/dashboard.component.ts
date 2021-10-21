import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HttpClientHelper{
  static baseURL: string = 'http://localhost:4201';
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  public Editor = ClassicEditor;
  @ViewChild('listPosts') listOfPosts!:ElementRef;
  @ViewChild('mainCentral') centralPanel!:ElementRef;
  queryData : any = [];

  constructor(private http: HttpClient) {

   }

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();
    this.http.get(`${HttpClientHelper.baseURL}/articles`).subscribe(

      (retrievedList:any) =>
      {
        this.queryData = retrievedList;
        console.log(this.queryData);
      });
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
