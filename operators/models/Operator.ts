import { IObservable } from "../../Observable/IObservable";
export type operator = (
  observable: IObservable,
  operatorFn: (value: any) => any
) => IObservable;
