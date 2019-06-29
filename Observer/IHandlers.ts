export interface IHandlers {
  next?: (value?: any) => void;
  complete?: () => void;
  error?: (error?: Error) => void;
  _unsubscribe?: () => void;
}
