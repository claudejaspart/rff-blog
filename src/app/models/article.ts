import { Tag } from '../models/tag';
import { SousArticle } from '../models/sousArticle';
import { Produit } from '../models/produit';


export class Article {

   private idArticle: number;
   private datePublication: string;
   private level: number;
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