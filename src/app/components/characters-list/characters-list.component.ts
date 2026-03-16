import { Component, Input } from '@angular/core';
import { Sim } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {
  @Input() characterList: Sim[];
}
