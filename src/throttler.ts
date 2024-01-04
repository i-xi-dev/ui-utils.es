type milliseconds = number;

// type ThrottlerOptions = {
//   signal?: AbortSignal,
// };

type ThrottlerCallback = () => void;

//XXX 必ずしもUI用かというと…？
export class Throttler {
  #interval: milliseconds;
  #throttling: boolean;
  constructor(interval: milliseconds) {
    if (Number.isSafeInteger(interval) && (interval >= 0)) {
      this.#interval = interval;
      this.#throttling = false;
    } else {
      throw new TypeError("interval");
    }
  }
  enqueue(callback: ThrottlerCallback): void {
    if (this.#throttling === true) {
      return;
    }
    this.#throttling = true;

    globalThis.setTimeout(() => {
      this.#throttling = false;
      callback();
    }, this.#interval);
  }
}
