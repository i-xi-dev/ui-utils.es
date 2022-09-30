// build_npmで必要
type _Timeout = {
  [Symbol.toPrimitive]: () => number;
  hasRef: () => boolean;
  ref: () => _Timeout;
  refresh: () => _Timeout;
  unref: () => _Timeout;
};

type milliseconds = number;

namespace UiUtils {
  /** @deprecated */
  export const PointerType = {
    MOUSE: "mouse",
    PEN: "pen",
    TOUCH: "touch",
  } as const;
  /** @deprecated */
  export type PointerType = typeof PointerType[keyof typeof PointerType];

  //XXX 必ずしもUI用かというと…？
  export const ListenerOptions = Object.freeze({
    PASSIVE: Object.freeze({ passive: true }) as AddEventListenerOptions,
  });

  //XXX 別のnamespaceに移す
  //XXX 必ずしもUI用かというと…？
  export function wait(delay: milliseconds): Promise<void> {
    return new Promise((resolve) => {
      globalThis.setTimeout(resolve, delay);
    });
  }
}
Object.freeze(UiUtils);

// type DebouncerOptions = {
//   signal?: AbortSignal,
// };

type DebouncerCallback = () => void;

//XXX 必ずしもUI用かというと…？
class Debouncer {
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
Object.freeze(Debouncer);

// type ThrottlerOptions = {
//   signal?: AbortSignal,
// };

type ThrottlerCallback = () => void;

//XXX 必ずしもUI用かというと…？
class Throttler {
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
Object.freeze(Throttler);

export { Debouncer, Throttler, UiUtils };
