import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album } from '../interfaces/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicsumService {
  protected readonly _http = inject(HttpClient);
  private readonly _url = 'https://picsum.photos/v2/list';

  get(): Observable<Album[]> {
    return this._http.get<Album[]>(this._url);
  }
}
