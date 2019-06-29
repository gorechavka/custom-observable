import { Observer } from "../Observer/Observer";

export function Observable(subscribe: (data: any) => () => void) {
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
