import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PicsumService } from '../../services/picsum.service';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'component-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
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

  ngOnInit(): void {
    this._picsumService.get().subscribe({
      next: (response: Album[]) => {
        console.log(response);
        
        this._albums.set(response);
      }
    });
  }

}
