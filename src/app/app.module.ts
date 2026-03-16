import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersCardComponent } from './components/characters-card/characters-card.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersCardComponent,
    CharactersListComponent,
    EpisodesListComponent
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
