export class Article 
{
   idArticle: number;
   datePublication: string;
   level: number;

   constructor(idArticle: number, datePublication: string, level: number) 
   {
      this.idArticle = idArticle;
      this.datePublication = datePublication;
      this.level = level;
   }
}