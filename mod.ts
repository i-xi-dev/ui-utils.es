// build_npmで必要
type _Timeout = {
  [Symbol.toPrimitive]: () => number;
  hasRef: () => boolean;
  ref: () => _Timeout;
  refresh: () => _Timeout;
  unref: () => _Timeout;
};

let _debounceT: number | undefined | _Timeout;

type milliseconds = number;

namespace UiUtils {
  export const PointerType = {
    MOUSE: "mouse",
    PEN: "pen",
    TOUCH: "touch",
  } as const;
  export type PointerType = typeof PointerType[keyof typeof PointerType];

  //XXX 必ずしもUI用かというと…？
  export const ListenerOptions = Object.freeze({
    PASSIVE: Object.freeze({ passive: true }) as AddEventListenerOptions,
  });

  //XXX 必ずしもUI用かというと…？
  export function wait(delay: milliseconds): Promise<void> {
    return new Promise((resolve) => {
      globalThis.setTimeout(resolve, delay);
    });
  }

  //XXX 必ずしもUI用かというと…？
  export function debounce(
    // deno-lint-ignore no-explicit-any
    func: (...args: any[]) => void,
    interval: milliseconds,
    // deno-lint-ignore no-explicit-any
  ): (...args: any[]) => void {
    // deno-lint-ignore no-explicit-any
    return (...args: any[]) => {
      if (_debounceT) {
        globalThis.clearTimeout(_debounceT as number); // as numberは _TimeoutがあるときにDenoでのテストに必要
      }
      _debounceT = globalThis.setTimeout(() => {
        //func.call(null, ...args);
        func(...args);
      }, interval);
    };
  }
}
Object.freeze(UiUtils);

export { UiUtils };
