export interface IObservable {
  subscribe: (data: any) => { unsubscribe: () => void };
}
