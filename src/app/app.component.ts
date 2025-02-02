import { Component } from '@angular/core';
import { CarouselComponent } from "./components/carousel/carousel.component";

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular19-owlcarousel-magnificpopup';
}
