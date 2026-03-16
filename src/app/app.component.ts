import { Component } from '@angular/core';
import { Sim, Episode, CastMember, CrewMember } from './interfaces/characters.interface';
import { Subscription } from 'rxjs';
import { CharactersServicesService } from './services/characters.services.service';

type Tab = 'info' | 'episodes' | 'cast' | 'stats' | 'random' | 'favorites';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sim: Sim[] = [];
  episodes: Episode[] = [];
  cast: CastMember[] = [];
  crew: CrewMember[] = [];
  favorites: Episode[] = [];

  showSim = true;
  loadingEpisodes = false;
  loadingCast = false;
  activeTab: Tab = 'info';

  private subscriptions: Subscription[] = [];

  constructor(private svc: CharactersServicesService) {}

  ngOnInit() {
    const sub = this.svc.getSim().subscribe({
      next: (data) => { this.sim = [data]; },
      error: (e) => console.log(e),
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() { this.subscriptions.forEach(s => s.unsubscribe()); }

  setTab(tab: Tab) {
    this.activeTab = tab;
    if (['episodes', 'stats', 'random'].includes(tab) && !this.episodes.length) this.loadEpisodes();
    if (tab === 'cast' && !this.cast.length) this.loadCast();
  }

  loadEpisodes() {
    this.loadingEpisodes = true;
    const sub = this.svc.getEpisodes().subscribe({
      next: (data) => { this.episodes = data; this.loadingEpisodes = false; },
      error: (e) => { console.log(e); this.loadingEpisodes = false; },
    });
    this.subscriptions.push(sub);
  }

  loadCast() {
    this.loadingCast = true;
    const subCast = this.svc.getCast().subscribe({
      next: (data) => { this.cast = data; this.loadingCast = false; },
      error: (e) => { console.log(e); this.loadingCast = false; },
    });
    const subCrew = this.svc.getCrew().subscribe({
      next: (data) => { this.crew = data; },
      error: (e) => console.log(e),
    });
    this.subscriptions.push(subCast, subCrew);
  }

  toggleFavorite(ep: Episode) {
    const idx = this.favorites.findIndex(f => f.id === ep.id);
    if (idx === -1) this.favorites = [...this.favorites, ep];
    else this.favorites = this.favorites.filter(f => f.id !== ep.id);
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(f => f.id === id);
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter(f => f.id !== id);
  }
}
