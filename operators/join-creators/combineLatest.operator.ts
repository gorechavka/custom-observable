import { IObservable } from "../../Observable/IObservable";
import { Observable } from "../../Observable/Observable";

export function combineLatest(...observables: IObservable[]) {
  const previousValues: any[] = [];
  let completed = 0;

  return Observable(observer => {
    const subscriptions = observables.map((observable, i) =>
      observable.subscribe({
        next: (value: any) => {
          previousValues[i] = value;
          observer.next(previousValues);
        },
        error: err => observer.error(err),
        complete: () => {
          ++completed;
          if (completed >= observables.length) {
            observer.complete();
          }
        }
      })
    );

    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  });
}
