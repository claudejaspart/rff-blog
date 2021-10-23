import { Tag } from '../models/tag';
import { SousArticle } from './subarticle';
import { Produit } from '../models/produit';


export class Article {

   idArticle: number;
   datePublication: string;
   level: number;
/*    private tags: Tag;
   private sousArticles: SousArticle;
   private produits: Produit; */

   constructor(idArticle: number, datePublication: string, level: number) {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
/*       this.tags = new Tag();
      this.sousArticles = new SousArticle();
      this.produits = new Produit();
   } */
   }
}