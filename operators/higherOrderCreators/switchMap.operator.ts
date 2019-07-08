import { IObservable } from "../../Observable/IObservable";
import { Observable } from "../../Observable/Observable";

export function switchMap(
  observable: IObservable,
  handler: (value: any) => IObservable
) {
  return Observable(observer => {
    let lastSubscription: { unsubscribe: () => void };

    const subscription = observable.subscribe({
      next: value => {
        if (lastSubscription) {
          lastSubscription.unsubscribe();
        }
        lastSubscription = handler(value).subscribe({
          next: observer.next(value)
        });
      },
      complete: () => {
        observer.complete();
        lastSubscription.unsubscribe();
      }
    });

    return () => subscription.unsubscribe();
  });
}
