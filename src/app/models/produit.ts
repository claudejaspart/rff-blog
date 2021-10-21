import { SousProduit } from '../models/sousProduit';

export class Produit {

   private idProduit: number;
   private imageLink: string;
   private productLink: string;
   private subProduit: SousProduit;

   constructor(idProduit: number, imageLink: string, productLink: string) {
      this.idProduit = idProduit;
      this.imageLink = imageLink;
      this.productLink = productLink;
      this.subProduit = new SousProduit();
   }     
}