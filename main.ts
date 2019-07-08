import { switchMap } from "./operators/higherOrderCreators/switchMap.operator";
import { of } from "./operators/creators/of.operator";
import { interval } from "./operators/creators/interval.operator";

const observable1 = interval(500);

const subscription = switchMap(observable1, x => of(x * 2)).subscribe({
  next: value => console.log(value),
  complete: () => console.log("complete")
});

setTimeout(subscription.unsubscribe, 4000);
