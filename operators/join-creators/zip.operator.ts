import { Observable } from "./../../Observable/Observable";

import { IObserver } from "./../../Observer/IObserver";
import { IObservable } from "../../Observable/IObservable";

export function zip(...observables: IObservable[]) {
  let completed = 0;
  let values = observables.map(() => []);
  let iteration = 0;

  return Observable((observer: IObserver) => {
    const subscriptions = observables.map((observable, i) =>
      observable.subscribe({
        next: value => {
          values[i].push(value);
          if (values.every(value => value[iteration])) {
            const res = values.reduce((acc, value) => {
              acc.push(value[iteration]);
              return acc;
            }, []);
            ++iteration;
            observer.next(res);
          }
        },
        error: err => observer.next(err),
        complete: () => {
          if (++completed === observables.length) {
            observer.complete();
          }
        }
      })
    );

    return () =>
      subscriptions.forEach(subscription => subscription.unsubscribe());
  });
}
