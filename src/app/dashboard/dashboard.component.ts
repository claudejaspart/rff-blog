import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MiniArticle } from '../models/MiniArticle';
import { MiniSubArticle } from '../models/MiniSubArticle';
import { MiniTag } from '../models/MiniTag';

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
  miniArticles: Array<MiniArticle> = [];
  isFrench : number = 1;
  showProductModal : boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();
    this.http.get(`${HttpClientHelper.baseURL}/miniarticles`).subscribe(

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

  loadArticles(miniArticleList : any) 
  {
    
    [...miniArticleList].forEach(art=> 
    {
        let currentArticle = new MiniArticle(
            art.idArticle, 
            art.datePublication, 
            art.level, 
            this.loadMiniSubArticles(art.subArticles),
            this.loadMiniTags(art.tags)
          );

        this.miniArticles.push(currentArticle);
    });

    console.log(this.miniArticles)
  }

  loadMiniSubArticles(miniSubArticleList:any)
  {
    let miniSubArticles = [] as any;
    [...miniSubArticleList].forEach((el=>
    {
        let currentSubArticle = new MiniSubArticle(
          el.idSubArticle,
          el.titre,
          el.language
        );

        miniSubArticles.push(currentSubArticle);
    }))

    return miniSubArticles;
  }

  loadMiniTags(miniTagsList:any)
  {
    let miniTags = [] as any;
    [...miniTagsList].forEach(el => 
    {
      let currentMiniTag = new MiniTag(
        el.libelle,
        el.language
      );
      miniTags.push(currentMiniTag);
    });

    return miniTags;
  }

  /* affichage modale nouveau produit */
  toggleProductModal()
  {
    this.showProductModal = !this.showProductModal;
  }

  productModalState($event : any) 
  {
    this.toggleProductModal();
  }
  
  /* selection de la langue */
  selectLanguage(event: Event)
  {
    this.isFrench = parseInt((<HTMLSelectElement>event.target).value);
  }

}

