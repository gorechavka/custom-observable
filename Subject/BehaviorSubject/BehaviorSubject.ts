import { Subject } from "./../Subject/Subject";
import { IHandlers } from "./../../Observer/IHandlers";
import { IObserver } from "./../../Observer/IObserver";

export function BehaviorSubject<T>(curValue: T) {
  let lastValue: T = curValue;
  const parent = Subject();
  const observers: IObserver[] = [];

  const next = (value: T) => {
    observers.forEach(observer => observer.next(value));
    lastValue = value;
  };

  const subscribe = (handlers: IHandlers) => {
    parent.subscribe(handlers);
    next(lastValue);
  };

  const { asObservable, complete } = parent;

  return {
    subscribe,
    next,
    complete,
    asObservable
  };
}
