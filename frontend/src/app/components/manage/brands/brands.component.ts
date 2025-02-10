import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BrandsService } from '../../../services/brands.service';

// ✅ Move the interface before the @Component decorator
export interface PeriodicElement {
  position: number;
  name: string;
  id: string
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
displayedColumns: string[] = ['position', 'name', 'id', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  brandService = inject(BrandsService)

  ELEMENT_DATA: PeriodicElement[] = [];


  constructor() {
    
  }

  ngOnInit(){
    this.getServerData();
  }

  getServerData(){
    this.brandService.getBrands().subscribe({
      next: (result: any) => {

        const formattedData = result.data.map((item:any, index:any) => ({
          position: index + 1, // Add a serial number
          name: item.name,
          id: item._id // Store the ID for actions
        }));

        this.dataSource.data = formattedData;
      },
      error: (err: any) => { },
      complete: () => { }
    })
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
    this.brandService.deleteBrand(id).subscribe({
      next:(result: any) => {
        this.getServerData();
      },
      error:(err: any) => {},
      complete:() => {}
    })
  }
  
}
