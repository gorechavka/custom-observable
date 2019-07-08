import { Observable } from "../../Observable/Observable";
import { IObservable } from "../../Observable/IObservable";

export function merge(...observables: IObservable[]) {
  let completed = 0;
  return Observable(observer => {
    const subscriptions = observables.map(observable =>
      observable.subscribe({
        next: value => observer.next(value),
        error: err => observer.error(err),
        complete: () => {
          if (++completed >= observables.length) {
            observer.complete();
          }
        }
      })
    );

    return () =>
      subscriptions.forEach(subscription => subscription.unsubscribe());
  });
}
