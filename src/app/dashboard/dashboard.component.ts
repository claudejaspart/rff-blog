import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';

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
  articles: Array<Article> = [];
  langFr : number = 1;
  showProductModal : boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();
    this.http.get(`${HttpClientHelper.baseURL}/articles`).subscribe(

      (retrievedList:any) =>
      {
        this.queryData = retrievedList;
        this.loadArticles(this.queryData);
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

  loadArticles(articleList : any) 
  {

    [...articleList].forEach(art=> 
    {
        this.loadDataSubarticles(art.subArticles);
        let currentArticle = new Article(art.idArticle, art.datePublication, art.level);
        this.articles.push(currentArticle);
    });
  }

  loadDataSubarticles(subArticleList:any)
  {
    let subArticles = [] as any;
    [...subArticleList].forEach((subart=>
      {
        console.log(subart);
      }))
  }

  toggleProductModal()
  {
    this.showProductModal = !this.showProductModal;
  }

  productModalState($event : any) 
  {
    this.toggleProductModal();
  }
}

