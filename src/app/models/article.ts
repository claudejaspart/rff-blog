import { SubArticle } from "./SubArticle";

export class Article 
{
   idArticle: number;
   datePublication: string;
   level: number;
   subArticles : Array<SubArticle>;

   constructor(idArticle: number, datePublication: string, level: number, subarticles : Array<SubArticle>) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
      this.subArticles = subarticles;
   }
}