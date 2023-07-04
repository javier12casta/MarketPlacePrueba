import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SideBarService } from '../../services/sideBar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: any[] = [];
  carousel: any[] = [];
  categories: any[] =[];
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('sliderContainer2') sliderContainer2!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('prevButton2') prevButton2!: ElementRef;
  @ViewChild('nextButton2') nextButton2!: ElementRef;
  currentSlideIndex = 0;
  currentProductImage!: string;

  constructor(private productService: ProductsService, private sidebarService: SideBarService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((resp: any) => {
      this.cards = resp;
      this.carousel = resp.slice(0,10);
    },() => {
      this.cards = [];
      this.carousel = [];
    });
    this.productService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    },() => {
      this.categories = [];
    });
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que se ejecuta despues de iniciada la vista, permitiendo la captura de los eventos de los botones prev y next
  */
  ngAfterViewInit() {
    this.prevButton.nativeElement.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton.nativeElement.addEventListener('click', this.nextSlide.bind(this));
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite el desplazamiento a la izquierda del slider de productos
  */
  prevSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft -= scrollAmount;
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite el desplazamiento a la derecha del slider de productos
  */
  nextSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft += scrollAmount;
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite agregar productos al carro
  * @param {product} product objeto del producto a agregar
  */
  addProductToSidebar(product: any): void {
    this.sidebarService.addProduct(product);
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite el cambio de imagen decrementando el currentSlideIndex 
  */
  prevSlide2() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.carousel = [];
      this.carousel.push(this.cards.slice(0,10)[this.currentSlideIndex]);
    }
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo que permite el cambio de imagen incrementando el currentSlideIndex 
  */
  nextSlide2() {
    if (this.currentSlideIndex < this.cards.slice(0,10).length - 1) {
      this.currentSlideIndex++;
      this.carousel = [];
      this.carousel.push(this.cards.slice(0,10)[this.currentSlideIndex]);
    }
  }
}
