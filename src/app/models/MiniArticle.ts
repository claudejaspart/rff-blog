import { MiniSubArticle } from "./MiniSubArticle";
import { MiniTag } from "./MiniTag";

export class MiniArticle 
{
   idArticle: number;
   datePublication: string;
   level: number;
   miniSubArticles : Array<MiniSubArticle>;
   miniTags : Array<MiniTag>


   constructor(   idArticle: number, 
                  datePublication: string, 
                  level: number, 
                  miniSubArticles : Array<MiniSubArticle>,
                  miniTags : Array<MiniTag>) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
      this.miniSubArticles = miniSubArticles;
      this.miniTags = miniTags;
   }
}