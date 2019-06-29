import { Observable } from "../../Observable/Observable";
import { IObservable } from "../../Observable/IObservable";

export function from(values): IObservable {
  return Observable(observer => {
    values.forEach(value => observer.next(value));

    observer.complete();

    return () => console.log("unsubscribed");
  });
}
