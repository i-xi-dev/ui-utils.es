// build_npmで必要
type _Timeout = {
  [Symbol.toPrimitive]: () => number;
  hasRef: () => boolean;
  ref: () => _Timeout;
  refresh: () => _Timeout;
  unref: () => _Timeout;
};

type milliseconds = number;

// type DebouncerOptions = {
//   signal?: AbortSignal,
// };

type DebouncerCallback = () => void;

//XXX 必ずしもUI用かというと…？
export class Debouncer {
  #interval: milliseconds;
  #timerId: number | undefined | _Timeout;
  constructor(interval: milliseconds) {
    if (Number.isSafeInteger(interval) && (interval >= 0)) {
      this.#interval = interval;
    } else {
      throw new TypeError("interval");
    }
  }
  enqueue(callback: DebouncerCallback): void {
    if (this.#timerId) {
      globalThis.clearTimeout(this.#timerId as number); // as numberは _TimeoutがあるときにDenoでのテストに必要
    }
    this.#timerId = globalThis.setTimeout(() => {
      callback();
    }, this.#interval);
  }
}
