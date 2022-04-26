import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private calls = 0;

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoadingSubject;

  public startCall() {
    console.log("startCall");
    this.calls++;
    this.update();
  }

  public endCall() {
    console.log("endCall");
    this.calls > 0 ? this.calls-- : this.calls = 0; // Make sure that number of calls cannot be negative
    this.update();
  }

  private update() {
    this.isLoadingSubject.next(this.calls > 0);
  }
}
