export class SousProduit {

   private idSubProduit: number;
   private libelle: string;
   private description: string;
   private language: string;

   constructor(idSubProduit: number, libelle: string, description: string, language: string) {
      this.idSubProduit = idSubProduit;
      this.libelle = libelle;
      this.description = description;
      this.language = language;
   }   
}