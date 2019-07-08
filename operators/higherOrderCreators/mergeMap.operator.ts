import { IObservable } from "../../Observable/IObservable";
import { Observable } from "../../Observable/Observable";

export function mergeMap(
  observable: IObservable,
  handler: (value: any) => IObservable
) {
  return Observable(observer => {
    const subscriptions = [];
    subscriptions.push(
      observable.subscribe({
        next: value => {
          const subscription = handler(value).subscribe({
            next: value => observer.next(value)
          });
          subscriptions.push(subscription);
        },
        complete: () => observer.complete()
      })
    );

    return () =>
      subscriptions.forEach(subscription => subscription.unsubscribe());
  });
}
