import { SousProduit } from './subproduit';

export class Produit {

   idProduit: number;
   imageLink: string;
   productLink: string;
   //subProduit: SousProduit;

   constructor(idProduit: number, imageLink: string, productLink: string) {
      this.idProduit = idProduit;
      this.imageLink = imageLink;
      this.productLink = productLink;
   }     
}