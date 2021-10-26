import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit 
{
  showProductModal : string = "closeProductModal";
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
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

}
