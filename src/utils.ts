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

export { UiUtils };
