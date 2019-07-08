export interface IObservable {
  subscribe: (data: any) => { unsubscribe: () => void };
  map?: (value: any) => any;
}
