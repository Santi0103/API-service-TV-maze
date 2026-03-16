import { Component, Input } from '@angular/core';
import { Episode } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-random-episode',
  templateUrl: './random-episode.component.html',
  styleUrl: './random-episode.component.css'
})
export class RandomEpisodeComponent {
  @Input() episodes: Episode[] = [];
  @Input() onFavorite: (ep: Episode) => void = () => {};
  @Input() isFavorite: (id: number) => boolean = () => false;

  current: Episode | null = null;
  spinning = false;
  history: Episode[] = [];
  historyIndex = -1;

  roll() {
    if (!this.episodes.length) return;
    this.spinning = true;
    setTimeout(() => {
      let ep: Episode;
      do { ep = this.episodes[Math.floor(Math.random() * this.episodes.length)]; }
      while (this.episodes.length > 1 && ep === this.current);
      // trim forward history
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(ep);
      this.historyIndex = this.history.length - 1;
      this.current = ep;
      this.spinning = false;
    }, 480);
  }

  prev() {
    if (this.historyIndex > 0) { this.historyIndex--; this.current = this.history[this.historyIndex]; }
  }

  next() {
    if (this.historyIndex < this.history.length - 1) { this.historyIndex++; this.current = this.history[this.historyIndex]; }
  }

  stripHtml(html: string) { return html ? html.replace(/<[^>]*>/g, '') : ''; }

  pad(n: number) { return String(n).padStart(2, '0'); }
}
