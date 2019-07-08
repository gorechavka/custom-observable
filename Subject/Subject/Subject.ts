import { Observer } from "./../../Observer/Observer";
import { IHandlers } from "./../../Observer/IHandlers";

export function Subject<T>() {
  const observers = [];

  const next = (value: T) => {
    observers.forEach(observer => observer.next(value));
  };

  const complete = () => observers.forEach(observer => observer.complete());

  const subscribe = (handlers: IHandlers) => {
    const observer = Observer(handlers);
    observers.push(observer);
  };

  const asObservable = () => {
    return {
      subscribe
    };
  };

  return {
    next,
    complete,
    subscribe,
    asObservable
  };
}
