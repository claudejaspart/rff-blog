export class SubProduit {

   idSubProduit: number;
   libelle: string;
   description: string;
   language: string;

   constructor(idSubProduit: number, libelle: string, description: string, language: string) 
   {
      this.idSubProduit = idSubProduit;
      this.libelle = libelle;
      this.description = description;
      this.language = language;
   }   
}