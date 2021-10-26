export class MiniSubArticle 
{
    idSubArticle: number;
    titre: string;
    language: string;

   constructor(idSubArticle: number, titre: string, language: string) {
      this.idSubArticle = idSubArticle;
      this.titre = titre;
      this.language = language;
   }     
}