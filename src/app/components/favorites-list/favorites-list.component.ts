import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Episode } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css'
})
export class FavoritesListComponent {
  @Input() favorites: Episode[] = [];
  @Output() remove = new EventEmitter<number>();

  stripHtml(html: string) { return html ? html.replace(/<[^>]*>/g, '') : ''; }
  pad(n: number) { return String(n).padStart(2, '0'); }
}
