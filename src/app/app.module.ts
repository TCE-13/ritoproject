import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ChampionsComponent } from './components/champions/champions.component';
import { ChampionComponent } from './components/champions/champion/champion.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LiveGameComponent } from './components//live-game/live-game.component';
import { AppRoutingModule } from './app-routing-module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ChampionsComponent,
    ChampionComponent,
    NotfoundComponent,
    LiveGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
