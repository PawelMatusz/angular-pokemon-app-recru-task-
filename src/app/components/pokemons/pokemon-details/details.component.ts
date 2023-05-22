import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { PokemonListResourceService } from '../pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  // nieużywane pole
  pokemonName = '';

  // typ zdefiniować, object nie może być praktycznie nigdy stosowany, zrobić interface responsa loadSprites
  // zamist subjectu można tu od razu obserwable przypisać
  sprites$!: Observable<object>;

  constructor(
    private route: ActivatedRoute,
    private loadDetails: PokemonListResourceService,
  ) {
  }

  ngOnInit(): void {
    // tu od razu można przypisać observable
    this.sprites$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const { name } = params;
        return this.loadDetails.loadSprites(name);
      }),
      map((sprite) => sprite.sprites),
    );
  }
}
