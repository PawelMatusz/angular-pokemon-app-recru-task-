import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { PokemonListResourceService } from '../pokemon.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  pokemonName = '';
  sprites$: Subject<object> = new Subject()

  constructor(
    private route: ActivatedRoute, 
    private loadDetails: PokemonListResourceService,
    ) {
  } 

  ngOnInit(): void {
  this.route.params.pipe(
    switchMap((params: Params) => {
      const { name } = params;
      return this.loadDetails.loadSprites(name);
    })
  ).subscribe(sprite => {
    this.sprites$.next(sprite.sprites);
  });

}
}
