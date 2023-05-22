import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from "../pokemon";
import { RouterLink } from '@angular/router';
import { PokemonListResourceService } from '../pokemon.service';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { LoadMoreComponent } from "../../load-more/load-more.component";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadMoreComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit, OnDestroy {

  initial = 10
  offset = 0;

  selectItem: number | null = null;

  pokemons: Array<Pokemon> = [];

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private readonly listResourceService: PokemonListResourceService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.fetchInitialList(this.initial, this.offset);
  }

  private fetchInitialList(initial: number, offset: number): void {

    this.listResourceService.getPokemons(initial, offset)
      .pipe(map((response) => response.results),
        tap(pokemons => pokemons.map((pokemon: Pokemon) => {

          const id = pokemon.url.split('/').filter(Boolean).at(-1);

          this.pokemons.push({
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          })

        })),
        takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck())
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

}
