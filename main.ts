import { interval } from "./operators/async/interval.operator";

const subscription = interval(1000).subscribe({
  next: value => console.log(value),
  complete: () => console.log("completed"),
  error: err => console.log(err)
});

setTimeout(subscription.unsubscribe, 2000);
