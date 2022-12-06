import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAnimal } from 'common-interface/interface/animal.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-project-a';

  private _unsubscribeAll$: Subject<void>;
  private _animals$: Observable<Array<IAnimal>>;
  animals?: Array<IAnimal>;

  constructor(
    private _appService: AppService,
  ) {
    this._unsubscribeAll$ = new Subject<void>();
    this._animals$ = _appService.getAnimals();
  }

  ngOnInit(): void {
    this._animals$.pipe(
      takeUntil(this._unsubscribeAll$),
    ).subscribe(animals => {
      console.log(animals);
      this.animals = animals ?? [];
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
