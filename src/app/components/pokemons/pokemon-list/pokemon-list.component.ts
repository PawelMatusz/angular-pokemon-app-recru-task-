import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { LoadMoreComponent } from '../../load-more/load-more.component';
import { Pokemon } from '../pokemon';
import { PokemonListResourceService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadMoreComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit, OnDestroy {

  initial = 10;
  offset = 0;

  selectItem: number | null = null;

  pokemons: Array<Pokemon> = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly listResourceService: PokemonListResourceService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.fetchInitialList(this.initial, this.offset);
  }

  private fetchInitialList(initial: number, offset: number): void {

    this.listResourceService.getPokemons(initial, offset)
      .pipe(
        map((response) => response.results),

        // jeżeli chcesz mapować to lepiej tak:
        map((pokemons) => pokemons.map((pokemon: Pokemon) => {
            const id = this.getPokemonIdFromUrl(pokemon.url);

            return {
              name: pokemon.name,
              url: pokemon.url,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
          })),
        tap((pokemons) => {
          this.pokemons = [...this.pokemons, ...pokemons];
        }),

        // a jeżeli to co przedtem to lepiej forach
        // to niżej tylko dla przykładu, lepiej tak jak w tym tap wyżej
        tap(pokemons => pokemons.forEach((pokemon: Pokemon) => {

          // metoda zamiast czarów
          const id = this.getPokemonIdFromUrl(pokemon.url);

          // nie powinno się pushować tylko robić nową referencję, jak najmniej mutowania
          this.pokemons = [
            ...this.pokemons,
            {
              name: pokemon.name,
              url: pokemon.url,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            },
          ];
        })),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  loadMore() {
    this.offset += this.initial;
    this.fetchInitialList(this.initial, this.offset);
  }

  selectPokemon(index: number): void {
    this.selectItem = index;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getPokemonIdFromUrl(url: string): string | undefined {
    return url.split('/').filter(Boolean).at(-1)
  }
}
