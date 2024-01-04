type milliseconds = number;

/** @deprecated */
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
