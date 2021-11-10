import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../../models/Produit';
import { SubProduit } from '../../models/SubProduit';
import { NgForm } from '@angular/forms';

export class HttpClientHelper
{
  static baseURL: string = 'http://localhost:4201';
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit 
{
  showProductModal : string = "closeProductModal";
  produits : Array<Produit> = [];
  selectedProduit : Produit = this.initSelectedProduit();
  isProductSelected : boolean = false;
  isFrench : number = 1;
  changingLanguage : boolean = false;
  flags : Array<string> = ["./assets/images/Flag_of_the_United_Kingdom.svg","./assets/images/Flag_of_France.svg"];
  libelleLength : number = 0;
  @Output() messageEvent = new EventEmitter<string>();

  // formulaire
  @ViewChild('productForm') productForm!:NgForm ;

  constructor(private http: HttpClient) {}

  ngOnInit(): void 
  {
        // liste des mini articles
        this.http.get(`${HttpClientHelper.baseURL}/produits`).subscribe(
          (retrievedList:any) =>
          {
            this.produits = this.loadProduits(retrievedList);
          });
  }

  // gestion fermeture modale
  closeProduct() 
  {
    this.messageEvent.emit(this.showProductModal)
  }

  // touche echap pour fermer la modale
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) 
  {
    if (event.key.toLowerCase() === "escape")
      this.closeProduct();
  }

  loadProduits(produitList:any)
  {
    if (produitList)
    {
      let produits = [] as any;
      [...produitList].forEach((el=>
      {
          let currentSubProduit = new Produit(
            el.idProduit,
            el.imageLink,
            el.produitLink,
            this.loadSubProduits(el.subProduits)
          );

          produits.push(currentSubProduit);

      }));
      return produits;
    }
    else
    {
      return null;
    }
  }

  loadSubProduits(subProduitList:any)
  {
    let subProduits = [] as any;
    [...subProduitList].forEach((el=>
    {
        let currentSubProduit = new SubProduit(
          el.idSubProduit,
          el.libelle,
          el.description,
          el.language
        );

        subProduits.push(currentSubProduit);
    }))

    return subProduits;
  }

  toggleLanguage()
  {
    this.changingLanguage = true;
    this.isFrench = (this.isFrench+1)%2;
    this.loadLibelle();
    this.loadDescription();
    this.changingLanguage = false;
  }

  selectProduct(event : Event)
  {
    let productId = parseInt((<HTMLSelectElement>event.target).value);
    if (productId >= 0)
    {
      // récupération du produit
      this.selectedProduit = (this.produits.filter(produit => produit.idProduit === productId))[0];

      // flag produit choisi
      this.isProductSelected = true;
    }
    else
    {
      this.selectedProduit = this.initSelectedProduit();
      this.isProductSelected = false;
    }

    // chargement des données dans le formulaire
    this.loadFormData()
  }

  initSelectedProduit() : Produit
  {
    return new Produit(-1,"","",[new SubProduit(-1,"","", "en"),new SubProduit(-1,"","", "fr")]); 
  }

  setUrlImage(imageURL : string)
  {
      this.selectedProduit.imageLink = imageURL;
  }

  setUrlProduct(productURL : string)
  {
      this.selectedProduit.produitLink = productURL;
  }

  setLibelle()
  {
    if (!this.changingLanguage)
    {
      let libelle = this.productForm.form.controls['libelle'].value;
      this.selectedProduit.subProduits[this.isFrench].libelle = libelle;
      this.libelleLength = libelle.length;
    }
  }

  setDescription()
  {
    if (!this.changingLanguage)
    {
      let description = this.productForm.form.controls['description'].value;
      this.selectedProduit.subProduits[this.isFrench].description = description;
    }
  }

  loadLibelle()
  {
    let libelle = this.selectedProduit.subProduits[this.isFrench].libelle;
    this.libelleLength = libelle.length;
    this.productForm.controls['libelle'].setValue(libelle);
  }

  loadDescription()
  {
    let description = this.selectedProduit.subProduits[this.isFrench].description;
    this.productForm.controls['description'].setValue(description);
  }

  submitProduct()
  {

    if (this.selectedProduit.idProduit >= 0)
    {
        this.http
        .put(`${HttpClientHelper.baseURL}/produit`,this.selectedProduit,{responseType:'text',reportProgress:true,observe:'events'})
        .subscribe(event => 
        {
          console.log(event);
        });     
    }
    else
    {
        this.http
        .post(`${HttpClientHelper.baseURL}/produit`,this.selectedProduit,{responseType:'text',reportProgress:true,observe:'events'})
        .subscribe(event => 
        {
          console.log(event);
        });  
    }

  }

  loadFormData()
  {
    // chargement du formulaire
    this.productForm.form.controls['imageUrl'].setValue(this.selectedProduit.imageLink);
    this.productForm.form.controls['productUrl'].setValue(this.selectedProduit.produitLink);
    this.productForm.form.controls['libelle'].setValue(this.selectedProduit.subProduits[this.isFrench].libelle);
    this.productForm.form.controls['description'].setValue(this.selectedProduit.subProduits[this.isFrench].description);
  }

}
