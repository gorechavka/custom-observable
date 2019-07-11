import { IObserver } from "./../Observer/IObserver";
import { Observer } from "../Observer/Observer";

export function Observable(subscribe: (observer: IObserver) => () => void) {
  return {
    subscribe: handlers => {
      const observer = Observer(handlers);

      observer._unsubscribe = subscribe(observer);

      return {
        unsubscribe: () => observer.unsubscribe()
      };
    }
  };
}
