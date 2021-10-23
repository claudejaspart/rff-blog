import { Tag } from '../models/tag';
import { SubArticle } from './subarticle';
import { Produit } from '../models/produit';

export class Article 
{

   idArticle: number;
   datePublication: string;
   level: number;
   subArticles: Array<SubArticle>;

   constructor(idArticle: number, datePublication: string, level: number, subArticles: Array<SubArticle>) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
      this.subArticles = subArticles;
   }
}