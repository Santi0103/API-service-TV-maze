import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Episode } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.css'
})
export class EpisodesListComponent implements OnChanges {
  @Input() episodes: Episode[] = [];
  @Input() favorites: Episode[] = [];
  @Output() toggleFavorite = new EventEmitter<Episode>();

  searchQuery: string = '';
  selectedSeason: number | 'all' = 'all';
  expandedEpisode: number | null = null;

  get seasons(): number[] {
    return [...new Set(this.episodes.map(e => e.season))].sort((a, b) => a - b);
  }

  get filteredEpisodes(): Episode[] {
    return this.episodes.filter(ep => {
      const matchSeason = this.selectedSeason === 'all' || ep.season === this.selectedSeason;
      const q = this.searchQuery.trim().toLowerCase();
      const matchSearch = !q || ep.name.toLowerCase().includes(q) ||
        (ep.summary && ep.summary.toLowerCase().includes(q));
      return matchSeason && matchSearch;
    });
  }

  get episodesBySeason(): { season: number; episodes: Episode[] }[] {
    const map = new Map<number, Episode[]>();
    for (const ep of this.filteredEpisodes) {
      if (!map.has(ep.season)) map.set(ep.season, []);
      map.get(ep.season)!.push(ep);
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([season, episodes]) => ({ season, episodes }));
  }

  isFav(id: number): boolean {
    return this.favorites.some(f => f.id === id);
  }

  toggleEpisode(id: number) {
    this.expandedEpisode = this.expandedEpisode === id ? null : id;
  }

  onFavClick(event: Event, ep: Episode) {
    event.stopPropagation();
    this.toggleFavorite.emit(ep);
  }

  clearSearch() { this.searchQuery = ''; }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['episodes']) {
      this.searchQuery = '';
      this.selectedSeason = 'all';
      this.expandedEpisode = null;
    }
  }

  stripHtml(html: string): string {
    return html ? html.replace(/<[^>]*>/g, '') : '';
  }
}
