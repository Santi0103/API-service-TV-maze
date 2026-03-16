import { Component, Input } from '@angular/core';
import { Sim } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrl: './characters-card.component.css'
})
export class CharactersCardComponent {
  @Input() character: Sim;
}
