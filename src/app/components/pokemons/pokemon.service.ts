import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { LoadSpritesResponse } from './sprite-response';
import { GetPokemonResponse } from './pokemon-response';


@Injectable({
  providedIn: 'root'
})
export class PokemonListResourceService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getPokemons(size: number, offset: number): Observable<GetPokemonResponse> {
    return this.httpClient.get<GetPokemonResponse>(`${this.apiUrl}?limit=${size}&offset=${offset}`)
  }

  loadSprites(name: string): Observable<LoadSpritesResponse> {
    return this.httpClient.get<LoadSpritesResponse>(`${this.apiUrl}/${name}`);
  }
}
