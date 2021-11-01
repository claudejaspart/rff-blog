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
export class DashboardComponent implements AfterViewInit 
{

  public Editor = ClassicEditor;
  @ViewChild('listPosts') listOfPosts!:ElementRef;
  @ViewChild('mainCentral') centralPanel!:ElementRef;

  // combo box de filtrage
  @ViewChild('tagFilter') tagFilter!:ElementRef;
  @ViewChild('levelFilter') levelFilter!:ElementRef;
  @ViewChild('yearFilter')  yearFilter!:ElementRef;
  @ViewChild('monthFilter') monthFilter!:ElementRef;
 
  isFrench : number = 1;
  showProductModal : boolean = false;
  showActionButtonsInArticleList : boolean = false;

  // données coté serveur
   queryData : any = [];
  miniArticles: Array<MiniArticle> = [];
  filteredMiniArticles : Array<MiniArticle> = [];
  allTags : Array<MiniTag> = [];
  allTagsInSameLanguage : Array<MiniTag> = [];

  // informations du formulaire
  level : number = 1;

  // paramètres de filtrage
  filterByTag = "";
  filterByLevel = 0;
  filterByMonth = 0;
  filterByYear = 0;

  // paramètre de selection d'article dans la liste
  previousIndex : number = -1;
  currentIndex : number = -1;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void 
  {
    this.resizePostsLists();

    // liste des mini articles
    this.http.get(`${HttpClientHelper.baseURL}/miniarticles`).subscribe(
      (retrievedList:any) =>
      {
        this.queryData = retrievedList;
        this.loadArticles(this.queryData);
        this.filteredMiniArticles = this.miniArticles;
      });

      // liste de tous les tags pour le filtrage
      this.http.get(`${HttpClientHelper.baseURL}/alltags`).subscribe((retrievedList:any) => this.loadFilterTags(retrievedList));

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

  // chargement des tags pour les filtres
  loadFilterTags(tags: any)
  {
    let allFilterTags = [] as any;
    [...tags].forEach(el => 
    {
      let currentTag = new MiniTag(
        el.libelle,
        el.language
      );
      allFilterTags.push(currentTag);
    });

    this.allTags = allFilterTags;
    this.loadFilterTagsInGivenLanguage(1);
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
    this.loadFilterTagsInGivenLanguage(this.isFrench);
  }

  /* selection du niveau */
  selectLevel(event: Event)
  {
    this.level = parseInt((<HTMLSelectElement>event.target).value);
  }

  /* fonctions de filtrages */

  /* change les tags dans la liste de filtrage en fonction de la langue */
  loadFilterTagsInGivenLanguage(language : number)
  {
    let currentLanguageString = language ? 'fr' : 'en';
    this.allTagsInSameLanguage = this.allTags.filter(tag => tag.language === currentLanguageString);
  }

  /* point d'entrée commun pour le filtrage */
  filterEntryPoint(event : Event, type : string)
  {
    // raz de la liste
    this.filteredMiniArticles = this.miniArticles;

    // selection du type
    if (type === "tags")
      this.filterByTag = (<HTMLSelectElement>event.target).value;
    else if (type === "level")
      this.filterByLevel = parseInt((<HTMLSelectElement>event.target).value);
    else if (type === "year")
      this.filterByYear = parseInt((<HTMLSelectElement>event.target).value);
    else if (type === "month")
      this.filterByMonth = parseInt((<HTMLSelectElement>event.target).value);

    // filtrage sur chaque valeur
    this.filterLevel();
    this.filterTag();
    this.filterMonth();
    this.filterYear();
  }

  /* filtrage par année */
  filterTag()
  {
    if (this.filterByTag.length)
      this.filteredMiniArticles = this.filteredMiniArticles.filter((article) => article.miniTags.filter(tag => tag.libelle === this.filterByTag).length > 0);
  }

  /* filtrage par niveau */
  filterLevel()
  {
    if (!isNaN(this.filterByLevel) && this.filterByLevel)
      this.filteredMiniArticles = this.filteredMiniArticles.filter((article) => article.level === this.filterByLevel);
  }

  /* filtrage par année */
  filterYear()
  {
    if (!isNaN(this.filterByYear) && this.filterByYear)
    {
      this.filteredMiniArticles = this.filteredMiniArticles.filter((article) => 
      {
        let currentYear = new Date(article.datePublication).getFullYear();
        return currentYear === this.filterByYear;
      });
    }
  }

  /* filtrage par mois */
  filterMonth()
  {
    if (!isNaN(this.filterByMonth) && this.filterByMonth)
    {
      this.filteredMiniArticles = this.filteredMiniArticles.filter((article) => 
      {
        let currentMonth = new Date(article.datePublication).getMonth() + 1;
        return currentMonth === this.filterByMonth;
      });
    }
  }

  /* reset des filtres */
  resetAllFilters()
  {
    // maj combobox
    this.tagFilter.nativeElement.selectedIndex = 0;
    this.levelFilter.nativeElement.selectedIndex = 0;
    this.yearFilter.nativeElement.selectedIndex = 0;
    this.monthFilter.nativeElement.selectedIndex = 0;

    // maj des valeurs
    this.filterByTag = "";
    this.filterByYear = 0;
    this.filterByLevel = 0;
    this.filterByMonth = 0;

    // maj de la liste filtrée
    this.filteredMiniArticles = this.miniArticles;
  }

  /* affiche les boutons des actions pour un element de la liste d'article */
  showActionList(id: number)
  {
    this.currentIndex = id;
    this.previousIndex = this.currentIndex;
  }

  /* cache les boutons des actions pour un element de la liste d'article */
  hideActionList(id: number)
  {
    this.currentIndex = -1;
    this.previousIndex = -1;
  }
}

