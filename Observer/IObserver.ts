export interface IObserver {
  next: (value: any) => void;
  complete: () => void;
  error: (error: Error) => void;
  unsubscribe: () => void;
  _unsubscribe?: () => void;
}
