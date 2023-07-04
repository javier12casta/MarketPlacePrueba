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
    });
    this.productService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    });
  }

  ngAfterViewInit() {
    this.prevButton.nativeElement.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton.nativeElement.addEventListener('click', this.nextSlide.bind(this));
  }

  prevSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft -= scrollAmount;
  }

  nextSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft += scrollAmount;
  }

  addProductToSidebar(product: any): void {
    this.sidebarService.addProduct(product);
  }

  changeSlide(product: any) {
    const currentIndex = this.cards.slice(0,10).findIndex(p => p === this.cards.slice(0,10)[this.currentSlideIndex]);
    this.currentSlideIndex = currentIndex;    
  }

  prevSlide2() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.carousel = [];
      this.carousel.push(this.cards.slice(0,10)[this.currentSlideIndex]);
    }
  }
  
  nextSlide2() {
    if (this.currentSlideIndex < this.cards.slice(0,10).length - 1) {
      this.currentSlideIndex++;
      this.carousel = [];
      this.carousel.push(this.cards.slice(0,10)[this.currentSlideIndex]);
    }
  }
}
