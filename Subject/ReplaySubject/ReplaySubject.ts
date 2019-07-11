import { IHandlers } from "./../../Observer/IHandlers";
import { Observer } from "./../../Observer/Observer";
import { IObserver } from "./../../Observer/IObserver";
import { Subject } from "./../Subject/Subject";
export function ReplaySubject<T>(num: number) {
  let cache: T[] = [];
  const parent = Subject();
  const observers: IObserver[] = [];

  const next = (value: T) => {
    observers.forEach(observer => observer.next(value));
    if (cache.length < num) {
      cache.push(value);
    } else {
      cache = [...cache.slice(1), value];
    }
  };

  const subscribe = (handlers: IHandlers) => {
    const observer = Observer(handlers);
    cache.forEach(value => observer.next(value));
    observers.push(observer);
  };

  const { asObservable, complete } = parent;

  return {
    subscribe,
    next,
    complete,
    asObservable
  };
}
