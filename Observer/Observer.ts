import { IObserver } from "./IObserver";
import { IHandlers } from "./IHandlers";

export function Observer(observer: IHandlers): IObserver {
  let unsubscribed = false;

  const fullObserver: IObserver = {
    next: value => {
      if (!unsubscribed && observer.next) {
        observer.next(value);
      }
    },
    error: error => {
      if (!unsubscribed) {
        observer.error && observer.error(error);
        fullObserver.unsubscribe();
      }
    },
    complete: () => {
      if (!unsubscribed) {
        observer.complete && observer.complete();
        fullObserver.unsubscribe();
      }
    },
    unsubscribe: () => {
      console.log("unsubscribe");
      unsubscribed = true;
      fullObserver._unsubscribe && fullObserver._unsubscribe();
    }
  };

  return fullObserver;
}
