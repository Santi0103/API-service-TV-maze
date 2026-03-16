import { Component } from '@angular/core';
import { Sim, Episode } from './interfaces/characters.interface';
import { Subscription } from 'rxjs';
import { CharactersServicesService } from './services/characters.services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sim: Sim[] = [];
  episodes: Episode[] = [];
  showSim = true;
  loadingEpisodes = false;
  activeTab: 'info' | 'episodes' = 'info';

  private subscriptions: Subscription[] = [];

  constructor(private charactersServices: CharactersServicesService) {}

  ngOnInit(): void {
    const sub = this.charactersServices.getSim().subscribe({
      next: (data) => { this.sim = [data]; },
      error: (error) => { console.log(error); },
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleSim() {
    this.showSim = !this.showSim;
  }

  setTab(tab: 'info' | 'episodes') {
    this.activeTab = tab;
    if (tab === 'episodes' && this.episodes.length === 0) {
      this.loadEpisodes();
    }
  }

  loadEpisodes() {
    this.loadingEpisodes = true;
    const sub = this.charactersServices.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = data;
        this.loadingEpisodes = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingEpisodes = false;
      },
    });
    this.subscriptions.push(sub);
  }
}
