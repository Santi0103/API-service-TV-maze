import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sim, Episode } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersServicesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://api.tvmaze.com/shows/83';
  }

  getSim() {
    return this.http.get<Sim>(this.url);
  }

  getEpisodes() {
    return this.http.get<Episode[]>(`${this.url}/episodes`);
  }
}
