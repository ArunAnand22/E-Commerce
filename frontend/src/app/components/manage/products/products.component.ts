import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../../services/product.service';

// ✅ Move the interface before the @Component decorator
export interface PeriodicElement {
  position: number;
  name: string;
  id: string,
  shortDescription: string,
  description: string,
  price: number,
  discount: number,
  // images: Array[],
  categoryId: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
displayedColumns: string[] = ['position', 'name', 'id','shortDescription', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productService = inject(ProductService)

  ELEMENT_DATA: PeriodicElement[] = [];


  constructor() {
    
  }

  ngOnInit(){
    this.getServerData();
  }

  getServerData(){
    this.productService.getProducts().subscribe({
      next: (result: any) => {

        const formattedData = result.data.map((item:any, index:any) => ({
          position: index + 1, // Add a serial number
          name: item.name,
          id: item._id, // Store the ID for actions
          shortDescription: this.truncateDescription(item.shortDescription, 5) // Store the ID for actions
        }));

        this.dataSource.data = formattedData;
      },
      error: (err: any) => { },
      complete: () => { }
    })
  }

  truncateDescription(description: string, wordLimit: number): string {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }


  editCategory(id: string) {
    console.log("Edit category with ID:", id);
    // Implement your edit logic here, e.g., open a modal for editing
  }
  
  deleteCategory(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next:(result: any) => {
        this.getServerData();
      },
      error:(err: any) => {},
      complete:() => {}
    })
  }
}
