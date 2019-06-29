import { Observable } from "../../Observable/Observable";
import { IObserver } from "../../Observer/IObserver";

export function interval(interval: number) {
  return Observable((observer: IObserver) => {
    let i = 0;
    const intervalId = setInterval(() => observer.next(++i), interval);

    return () => {
      clearInterval(intervalId);
      console.log("Observable.interval: unsubscribed");
    };
  });
}
