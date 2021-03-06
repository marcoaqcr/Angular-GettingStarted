import { Component, OnInit } from "@angular/core";
import { IProduct } from "../products/product";
import { ProductService } from './product.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  
  _listFilter: string;
  
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products
  }

  constructor(private productService: ProductService) {
  }

  filteredProducts: IProduct[];

  products: IProduct[] = []; 

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
        next:  p => { 
          this.products = p,
          this.filteredProducts = this.products; 
        },
        error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLowerCase().indexOf(filterBy) !== -1 )
  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }

  onRatngClicked(message: string): void {
    this.pageTitle = `Page Title: ${message}`
  }
}
