import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CategoryService } from '../../../services/category.service';

// ✅ Move the interface before the @Component decorator
export interface PeriodicElement {
  position: number;
  name: string;
  id: string
}



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'id', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categoryService = inject(CategoryService)

  ELEMENT_DATA: PeriodicElement[] = [];


  constructor() {
    
  }

  ngOnInit(){
    this.categoryService.getCategories().subscribe({
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
    console.log("Delete category with ID:", id);
  }
  
}
