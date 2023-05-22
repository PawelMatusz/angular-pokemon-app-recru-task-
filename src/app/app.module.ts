import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { PokemonListComponent } from "./components/pokemons/pokemon-list/pokemon-list.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LoadMoreComponent } from "./components/load-more/load-more.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MainHeaderComponent,
    PokemonListComponent,
    LoadMoreComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
