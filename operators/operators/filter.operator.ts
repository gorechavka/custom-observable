import { IObserver } from "../../Observer/IObserver";
import { Observable } from "../../Observable/Observable";
import { operator } from "../models/Operator";

export const filter: operator = (observable, operatorFn) => {
  return Observable((observer: IObserver) => {
    const subscription = observable.subscribe({
      next: value => {
        if (operatorFn(value)) {
          return observer.next(value);
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    });

    return subscription.unsubscribe;
  });
};
