import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PicsumService } from '../../services/picsum.service';
import { Album } from '../../interfaces/album';
import JQuery from 'jquery';

@Component({
  selector: 'component-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  protected readonly _picsumService = inject(PicsumService);
  protected readonly _albums = signal<Album[]>([]);

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    margin: 5,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
  }

  constructor() {
    effect(() => this.initializeMagnificPopup());
  }

  ngOnInit(): void {
    this._picsumService.get().subscribe({
      next: (response: Album[]) => {
        this._albums.set(response);
        this.initializeMagnificPopup();
      }
    });
  }

  initializeMagnificPopup() {
    ($('#listcarousel') as any).magnificPopup({
      delegate: '.owl-item:not(.cloned) .showfullimg',
      type: 'image',
      removalDelay: 300,
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item: any) {
          return item.el.attr('title');
        },
      }
    });
  }


}
