export class SubArticle 
{
   idSubArticle: number;
   titre: string;
   description: string;
   richTextData: string;
   videoLink: string;
   language: string;

   constructor(idSubArticle: number, 
               titre: string, 
               description: string, 
               richTextData: string, 
               videoLink: string, 
               language: string) 
   {
      this.idSubArticle = idSubArticle;
      this.titre = titre;
      this.description = description;
      this.richTextData = richTextData;
      this.videoLink = videoLink;
      this.language = language;
   }     
}