import { Observable } from "../../Observable/Observable";
import { IObserver } from "../../Observer/IObserver";

export const fromEvent = (element: HTMLElement, event: string) =>
  Observable((observer: IObserver) => {
    const eventHandler = (event: Event) => observer.next(event);
    element.addEventListener(event, eventHandler);

    return () => {
      element.removeEventListener(event, eventHandler);
      console.log("Observer.fromEvent: unsubscribed");
    };
  });
