import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersCardComponent } from './components/characters-card/characters-card.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { CastListComponent } from './components/cast-list/cast-list.component';
import { StatsPanelComponent } from './components/stats-panel/stats-panel.component';
import { RandomEpisodeComponent } from './components/random-episode/random-episode.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersCardComponent,
    CharactersListComponent,
    EpisodesListComponent,
    CastListComponent,
    StatsPanelComponent,
    RandomEpisodeComponent,
    FavoritesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
