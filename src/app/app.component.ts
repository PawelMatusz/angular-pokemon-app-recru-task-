import {  Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  // constructor() {
    // this.noopZoneRouterHack();
  // }
  // private noopZoneRouterHack(): void {
  //   this.router.events
  //     .pipe(
  //       filter(e => e instanceof NavigationEnd),
  //       takeUntil(this.destroyWithComponent$)
  //     )
  //     .subscribe(() =>
  //       this.applicationRef.tick()
  //     );
  // }
}
