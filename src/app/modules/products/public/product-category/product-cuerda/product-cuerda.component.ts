import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
declare const initSelect: any;
declare const showMessage: any;
@Component({
  selector: 'app-product-cuerda',
  templateUrl: './product-cuerda.component.html',
  styleUrls: ['./product-cuerda.component.css']
})
export class ProductCuerdaComponent implements OnInit {

  isLogged?: Boolean = false;
  fgValidator!: FormGroup;
  productId!: String;
  imagesList: ProductModel[] = [];
  listaNumero!: ProductModel;
  idToRemove!: String;
  numero!: number;
  subscription: Subscription = new Subscription;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private services: SecurityService
  ) {
    
   }

  ngOnInit(): void {
    this.getAllProducts();
    this.subscription = this.services.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
    });
  }
  

  getAllProducts() {
    this.service.getAllCuerda().subscribe(
      data => {
        this.imagesList = data;
        console.log(this.imagesList);
      },
      err => {
        showMessage("Error loading current images of product.");
      }
    );
  }
  //función que verifica la variable en mención
  
  OpenDetails(id){
    this.router.navigate([`/products/product-details/${id}`]);
  }
  OpenRegister(){
    this.router.navigate([`/customer/register`]);
  }

}
