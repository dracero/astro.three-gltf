import { isOpen } from "./store.js";

let count;

isOpen.subscribe((value) => {
  count = value;
});

export function increment() {
  isOpen.set(count + 1);
}

export function decrement() {
  isOpen.set(count - 1);
}
