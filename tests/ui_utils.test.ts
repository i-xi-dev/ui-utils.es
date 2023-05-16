import { assertStrictEquals } from "./deps.ts";
import { Debouncer, Throttler, UiUtils } from "../mod.ts";

Deno.test("UiUtils.wait(number)", async () => {
  const s = performance.now();

  await UiUtils.wait(200);

  const e = performance.now() - s;
  console.log(e);
  assertStrictEquals(e >= 200, true);
});

Deno.test("UiUtils.wait(number) - 2", async () => {
  const s = performance.now();

  await UiUtils.wait(200);
  await UiUtils.wait(200);

  const e = performance.now() - s;
  console.log(e);
  assertStrictEquals(e >= 400, true);
});

Deno.test("Debouncer.prototype.enqueue(Function)", async () => {
  let i = 0;
  const d = new Debouncer(300);

  d.enqueue(() => {
    i = i + 1;
  });
  await UiUtils.wait(100);
  d.enqueue(() => {
    i = i + 1;
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 1);
});

Deno.test("Debouncer.prototype.enqueue(Function) - 2", async () => {
  let i = 0;
  const d = new Debouncer(300);

  d.enqueue(() => {
    i = i + 1;
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    i = i + 1;
  });

  await UiUtils.wait(1400);
  assertStrictEquals(i, 2);
});

Deno.test("Debouncer.prototype.enqueue(Function) - 3", async () => {
  let i = "";
  const d = new Debouncer(300);

  d.enqueue(() => {
    i = i + "a1";
  });
  await UiUtils.wait(100);
  d.enqueue(() => {
    i = i + "b2";
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, "b2");
});

Deno.test("Debouncer.prototype.enqueue(Function) - 4", async () => {
  let i = "";
  const d = new Debouncer(300);

  d.enqueue(() => {
    i = i + "a1";
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    i = i + "b2";
  });

  await UiUtils.wait(1400);
  assertStrictEquals(i, "a1b2");
});

Deno.test("Debouncer.prototype.enqueue(Function) - 5", async () => {
  let i = 0;
  const d = new Debouncer(300);
  const f = (a1: number) => {
    i = i + a1;
  };

  d.enqueue(() => {
    f(5);
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    f(7);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 12);
});

Deno.test("Debouncer.prototype.enqueue(Function) - 6", async () => {
  let i = 0;
  const d = new Debouncer(300);
  const f = (a1: number, a2: number) => {
    i = i + a1 + a2;
  };

  d.enqueue(() => {
    f(5, 6);
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    f(7, 8);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 26);
});

Deno.test("Debouncer.prototype.enqueue(Function) - 7", async () => {
  let i = 0;
  const d = new Debouncer(300);
  const f = (a1: number, a2: number) => {
    i = i + a1 + a2;
  };

  d.enqueue(() => {
    f(5, 6);
  });
  await UiUtils.wait(200);
  d.enqueue(() => {
    f(7, 8);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 15);
});

Deno.test("Throttler.prototype.enqueue(Function)", async () => {
  let i = 0;
  const d = new Throttler(300);

  d.enqueue(() => {
    i = i + 1;
  });
  await UiUtils.wait(100);
  d.enqueue(() => {
    i = i + 1;
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 1);
});

Deno.test("Throttler.prototype.enqueue(Function) - 2", async () => {
  let i = 0;
  const d = new Throttler(300);

  d.enqueue(() => {
    i = i + 1;
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    i = i + 1;
  });

  await UiUtils.wait(1400);
  assertStrictEquals(i, 2);
});

Deno.test("Throttler.prototype.enqueue(Function) - 3", async () => {
  let i = "";
  const d = new Throttler(300);

  d.enqueue(() => {
    i = i + "a1";
  });
  await UiUtils.wait(100);
  d.enqueue(() => {
    i = i + "b2";
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, "a1");
});

Deno.test("Throttler.prototype.enqueue(Function) - 4", async () => {
  let i = "";
  const d = new Throttler(300);

  d.enqueue(() => {
    i = i + "a1";
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    i = i + "b2";
  });

  await UiUtils.wait(1400);
  assertStrictEquals(i, "a1b2");
});

Deno.test("Throttler.prototype.enqueue(Function) - 5", async () => {
  let i = 0;
  const d = new Throttler(300);
  const f = (a1: number) => {
    i = i + a1;
  };

  d.enqueue(() => {
    f(5);
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    f(7);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 12);
});

Deno.test("Throttler.prototype.enqueue(Function) - 6", async () => {
  let i = 0;
  const d = new Throttler(300);
  const f = (a1: number, a2: number) => {
    i = i + a1 + a2;
  };

  d.enqueue(() => {
    f(5, 6);
  });
  await UiUtils.wait(400);
  d.enqueue(() => {
    f(7, 8);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 26);
});

Deno.test("Throttler.prototype.enqueue(Function) - 7", async () => {
  let i = 0;
  const d = new Throttler(300);
  const f = (a1: number, a2: number) => {
    i = i + a1 + a2;
  };

  d.enqueue(() => {
    f(5, 6);
  });
  await UiUtils.wait(200);
  d.enqueue(() => {
    f(7, 8);
  });

  await UiUtils.wait(400);
  assertStrictEquals(i, 11);
});
