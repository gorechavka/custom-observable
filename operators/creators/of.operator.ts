import { from } from "./from.operator";
export function of(...values: any[]) {
  return from(values);
}
