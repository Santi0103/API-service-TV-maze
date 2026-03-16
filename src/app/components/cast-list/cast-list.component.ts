import { Component, Input, OnChanges } from '@angular/core';
import { CastMember, CrewMember } from '../../interfaces/characters.interface';

type SubTab = 'characters' | 'actors' | 'crew';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrl: './cast-list.component.css'
})
export class CastListComponent implements OnChanges {
  @Input() cast: CastMember[] = [];
  @Input() crew: CrewMember[] = [];

  subTab: SubTab = 'characters';
  searchQuery = '';
  expanded: number | null = null;

  get filteredChars(): CastMember[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.cast.filter(c => !q || c.character.name.toLowerCase().includes(q));
  }

  get filteredActors(): CastMember[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.cast.filter(c => !q || c.person.name.toLowerCase().includes(q));
  }

  get crewRoles(): string[] {
    const order = ['Creator', 'Executive Producer', 'Showrunner', 'Developer',
                   'Writer', 'Director', 'Producer', 'Music'];
    const allRoles = [...new Set(this.crew.map(c => c.type))];
    return [...order.filter(r => allRoles.includes(r)), ...allRoles.filter(r => !order.includes(r))];
  }

  crewByRole(role: string): CrewMember[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.crew.filter(c => c.type === role && (!q || c.person.name.toLowerCase().includes(q)));
  }

  setSubTab(tab: SubTab) { this.subTab = tab; this.searchQuery = ''; this.expanded = null; }
  toggle(id: number) { this.expanded = this.expanded === id ? null : id; }
  ngOnChanges() { this.searchQuery = ''; this.expanded = null; }

  age(birthday: string | null): string {
    if (!birthday) return 'N/D';
    const diff = Date.now() - new Date(birthday).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) + ' años';
  }

  roleIcon(role: string): string {
    const icons: Record<string, string> = {
      'Creator': '⭐', 'Executive Producer': '🎬', 'Showrunner': '🎯',
      'Developer': '💡', 'Writer': '✍️', 'Director': '🎥', 'Producer': '📽', 'Music': '🎵'
    };
    return icons[role] || '🎞';
  }

  stripHtml(html: string | null | undefined): string {
    return html ? html.replace(/<[^>]*>/g, '').trim() : '';
  }

  bioPreview(summary: string | null | undefined): string {
    const text = this.stripHtml(summary);
    if (!text) return '';
    return text.length > 160 ? text.slice(0, 160) + '…' : text;
  }
}
