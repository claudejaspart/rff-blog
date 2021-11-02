import { SubProduit } from "./SubProduit";

export class Produit {

   idProduit: number;
   imageLink: string;
   produitLink: string;
   subProduits : Array<SubProduit>;

   constructor(idProduit: number, imageLink: string, produitLink: string, subProduits:Array<SubProduit>) 
   {
      this.idProduit = idProduit;
      this.imageLink = imageLink;
      this.produitLink = produitLink;
      this.subProduits = subProduits;
   }     
}