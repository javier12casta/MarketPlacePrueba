import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideBarService } from '../../services/sideBar.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shoppingCart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any[] = [];
  counter: number = 0;
  uniqueProducts: { product: any, quantity: number }[] = [];
  selectedProducts: any[] = [];
  selectValue = new FormControl();

  constructor(private sidebarService: SideBarService) { }

  ngOnInit() {
    this.selectValue.setValue('xlsx');
    this.sidebarService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.counter = this.products.length;
      this.sidebarService.setCartCounter(this.counter);

      // Reiniciar el arreglo de productos únicos
      this.uniqueProducts = [];

      // Iterar sobre los productos y contar la cantidad total
      this.products.forEach((product: any) => {
        const existingProduct = this.uniqueProducts.find(p => p.product === product);

        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          this.uniqueProducts.push({ product, quantity: 1 });
        }
      });
      this.selectedProducts = this.uniqueProducts;
    });

  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite remover productos del carro
  * @param {product} product objeto del producto a remover
  */
  removeProductToSidebar(product: any): void {
    this.sidebarService.removeProduct(product);
  }

  /**
  * @author Javier Castañeda
  * @purpose metodo que permite la descarga de productos en formato CSV, Xlsx de acuerdo a lo selecionado por el usuario por defecto usa Xlsx
  */
  downloadProducts(): void {
    let type = this.selectValue.value || 'xlsx'
    switch (type) {
      case 'CSV':
        const csvContent = this.convertToCSV(this.selectedProducts);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'products.csv');
        break;
      case 'xlsx':
        const workbook = XLSX.utils.book_new();
        const productsData = this.selectedProducts.map(product => [product.product.title, product.product.price, product.quantity, product.product.description ]);
      
        // Crear una hoja de cálculo para los productos
        const productSheet = XLSX.utils.aoa_to_sheet(productsData);
        XLSX.utils.sheet_add_aoa(productSheet, [['Title', 'Price', 'Quantity', 'Description']]);
        const productSheetName = 'Products';
        XLSX.utils.book_append_sheet(workbook, productSheet, productSheetName);
      
        // Convertir el libro de trabajo a un buffer de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        // Crear un objeto Blob para el archivo Excel
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      
        // Guardar el archivo Excel
        saveAs(data, 'products.xlsx');
        break;
    }
  }

  /**
  * @author Javier Castañeda
  * @purpose metodo que permite la convercion del arreglo de productos a la estructura del formato CSV
  */
  convertToCSV(products: any[]): string {
    const rows = [];
    const headers = ['Title', 'Price', 'Quantity', 'Description']; // Reemplaza con los campos relevantes de tu modelo de producto

    rows.push(headers.join(','));

    for (const unique of products) {
      const rowData = [unique.product.title, unique.product.price, unique.quantity, unique.product.description ]; // Reemplaza con los campos relevantes de tu modelo de producto
      rows.push(rowData.join(','));
    }

    return rows.join('\n');
  }

}
