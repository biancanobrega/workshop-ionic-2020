import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IComic } from './comic.model';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  host: string;

  constructor(private readonly httpClient: HttpClient ) {
    this.host = `${environment.api}/comics`;
  }

  getCommics() {
    return this.httpClient.get<IComic[]>(this.host);
  }

  getComic(comicId: number) {
    return this.httpClient.get<IComic>(`${this.host}/${comicId}`);
  }

  addComic(comic: IComic) {
    return this.httpClient.post(this.host, comic);
  }

  updateComic(comic: IComic) {
    return this.httpClient.put(`${this.host}/${comic.id}`, comic);
  }

  removeComic(comicId: number) {
    return this.httpClient.delete(`${this.host}/${comicId}`);
  }
}
