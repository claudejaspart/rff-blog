export class Tag {

   private idTag: number;
   private libelle: string;
   private language: string;

   constructor(idTag: number, libelle: string, language: string) {
      this.idTag = idTag;
      this.libelle = libelle;
      this.language = language;
   }   
}