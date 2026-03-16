import { Component, Input, OnChanges } from '@angular/core';
import { Episode } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.css'
})
export class StatsPanelComponent implements OnChanges {
  @Input() episodes: Episode[] = [];

  stats: any = {};

  ngOnChanges() {
    if (!this.episodes.length) return;
    const seasons = [...new Set(this.episodes.map(e => e.season))];
    const totalRuntime = this.episodes.reduce((acc, e) => acc + (e.runtime || 0), 0);
    const withImage = this.episodes.filter(e => e.image).length;

    const bySeason = seasons.map(s => {
      const eps = this.episodes.filter(e => e.season === s);
      return { season: s, count: eps.length };
    });

    const years = this.episodes
      .map(e => e.airdate ? new Date(e.airdate).getFullYear() : null)
      .filter(Boolean) as number[];
    const firstYear = Math.min(...years);
    const lastYear = Math.max(...years);

    this.stats = {
      totalEpisodes: this.episodes.length,
      totalSeasons: seasons.length,
      totalRuntimeHours: Math.floor(totalRuntime / 60),
      totalRuntimeDays: (totalRuntime / 60 / 24).toFixed(1),
      avgEpisodesPerSeason: (this.episodes.length / seasons.length).toFixed(1),
      withImagePct: Math.round((withImage / this.episodes.length) * 100),
      firstYear,
      lastYear,
      bySeason
    };
  }

  barWidth(count: number): number {
    const max = Math.max(...(this.stats.bySeason?.map((s: any) => s.count) || [1]));
    return Math.round((count / max) * 100);
  }
}
