import { Subject } from "./Subject/Subject/Subject";

const subject = Subject<number>();

const subscription1 = subject.subscribe({
  next: value => console.log("subscriber 1 got " + value),
  error: () => console.log("error"),
  complete: () => console.log("subscriber 1 completed")
});

const subscription2 = subject.subscribe({
  next: value => console.log("subscriber 2 got " + value),
  error: () => console.log("error"),
  complete: () => console.log("subscriber 2 completed")
});

subject.next(5);
subject.next(7);
setTimeout(subject.complete, 500);
