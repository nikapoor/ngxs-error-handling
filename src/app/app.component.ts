import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CountState, HandledError, UnhandledError } from './app.state';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @Select(CountState) 
  count$!: Observable<number>;

  constructor(private store: Store) { }

  handled() {
    this.store.dispatch(new HandledError()).pipe(
      catchError(err => {
        console.log("handled error on dispatch subscription")
        return of('')
      })
    ).subscribe();
  }

  unhandled() {
    this.store.dispatch(new UnhandledError()).pipe(
      catchError(err => {
        console.log("unhandled error on dispatch subscription")
        return of('')
      })
    ).subscribe();;
  }

}
