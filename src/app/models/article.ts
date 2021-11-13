import { Byte } from "@angular/compiler/src/util";
import { Produit } from "./Produit";
import { SubArticle } from "./SubArticle";
import { Tag } from "./Tag";

export class Article 
{
   idArticle: number;
   datePublication: string;
   level: number;
   archive : string;
   tags : Array<Tag>;
   subArticles : Array<SubArticle>;
   produits : Array<Produit>;

   constructor(idArticle: number, datePublication: string, level: number, archive : string, subArticles : Array<SubArticle>, 
               tags : Array<Tag>,produits : Array<Produit>) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
      this.archive = archive;
      this.subArticles = subArticles;
      this.produits = produits;
      this.tags = tags;
   }
}