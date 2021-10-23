import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
import { SubArticle } from '../models/subarticle';

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
  langFr: boolean = false;

  constructor(private http: HttpClient) {

   }

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();
    this.http.get(`${HttpClientHelper.baseURL}/articles`).subscribe(

      (retrievedList:any) =>
      {
        this.queryData = retrievedList;
        this.loadDataArticles(this.queryData);
        //console.log(this.queryData);
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

  loadDataArticles(articleList: any) {
    [...articleList].forEach(art => 
      {

        let currentArticle = new Article(art.idArticle, art.datePublication, art.level, this.loadDataSubarticles(art.subArticles));

        console.log(currentArticle);
        this.articles.push(currentArticle);
      });
  }

  loadDataSubarticles(subarticleList: any) {
    let subArticles = [] as any;
    [...subarticleList].forEach(subart => {
      let currentSubarticle = new SubArticle(
        subart.idSubarticle,
        subart.titre,
        subart.description,
        subart.richTextData,
        subart.videolink,
        subart.language);
        subArticles.push(currentSubarticle);
    });  
    return subArticles;
  }


}
