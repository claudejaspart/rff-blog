export class Tag 
{
   idTag : number;
   libelle: string;
   language: string;
   

   constructor(idTag: number,libelle: string,language: string) 
   {
      this.idTag = idTag;
      this.libelle = libelle;
      this.language = language;
   }   
}