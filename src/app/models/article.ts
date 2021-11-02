import { Produit } from "./Produit";
import { SubArticle } from "./SubArticle";
import { Tag } from "./Tag";

export class Article 
{
   idArticle: number;
   datePublication: string;
   level: number;
   tags : Array<Tag>;
   subArticles : Array<SubArticle>;
   produits : Array<Produit>;

   constructor(idArticle: number, datePublication: string, level: number, subArticles : Array<SubArticle>, 
               tags : Array<Tag>,produits : Array<Produit>) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
      this.subArticles = subArticles;
      this.produits = produits;
      this.tags = tags;
   }
}