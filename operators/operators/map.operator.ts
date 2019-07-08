import { IObservable } from "../../Observable/IObservable";
import { Observable } from "../../Observable/Observable";

import { IObserver } from "../../Observer/IObserver";
import { operator } from "../models/Operator";

export const map: operator = (
  observable: IObservable,
  transformFn: (value: any) => any
) => {
  return Observable((observer: IObserver) => {
    const subscription = observable.subscribe({
      next: value => observer.next(transformFn(value)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    });

    return subscription.unsubscribe;
  });
};
