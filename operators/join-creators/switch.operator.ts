import { IObserver } from "./../../Observer/IObserver";
import { Observable } from "../../Observable/Observable";
import { IObservable } from "../../Observable/IObservable";
export function _switch(...observables: IObservable[]) {
  return Observable((observer: IObserver) => {
    let lastSubscription: { unsubscribe: () => void };
    let completed = 0;

    const subscriptions = observables.map((observable, i) => {
      return observable.subscribe({
        next: value => {
          if (lastSubscription) {
            lastSubscription.unsubscribe();
            ++completed;
          }
          lastSubscription = subscriptions[i];
          observer.next(value);
        },
        error: () => {
          if (lastSubscription === subscriptions[i]) {
            lastSubscription.unsubscribe();
            ++completed;
            lastSubscription = null;
          }
        },
        complete: () => {
          if (++completed === observables.length) {
            observer.complete();
          }
        }
      });
    });
    return () => lastSubscription.unsubscribe();
  });
}
