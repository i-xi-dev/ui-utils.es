import { assertStrictEquals } from "std/testing/asserts";
import { UiUtils } from "../mod.ts";

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

Deno.test("UiUtils.debounce(Function, number)", async () => {
  let i = 0;

  UiUtils.debounce(() => {
    i = i + 1;
  }, 300)();
  await UiUtils.wait(100);
  UiUtils.debounce(() => {
    i = i + 1;
  }, 300)();

  await UiUtils.wait(400);
  assertStrictEquals(i, 1);
});

Deno.test("UiUtils.debounce(Function, number) - 2", async () => {
  let i = 0;

  UiUtils.debounce(() => {
    i = i + 1;
  }, 300)();
  await UiUtils.wait(400);
  UiUtils.debounce(() => {
    i = i + 1;
  }, 300)();

  await UiUtils.wait(1400);
  assertStrictEquals(i, 2);
});

Deno.test("UiUtils.debounce(Function, number) - 3", async () => {
  let i = "";

  UiUtils.debounce(() => {
    i = i + "a1";
  }, 300)();
  await UiUtils.wait(100);
  UiUtils.debounce(() => {
    i = i + "b2";
  }, 300)();

  await UiUtils.wait(400);
  assertStrictEquals(i, "b2");
});

Deno.test("UiUtils.debounce(Function, number) - 4", async () => {
  let i = "";

  UiUtils.debounce(() => {
    i = i + "a1";
  }, 300)();
  await UiUtils.wait(400);
  UiUtils.debounce(() => {
    i = i + "b2";
  }, 300)();

  await UiUtils.wait(1400);
  assertStrictEquals(i, "a1b2");
});

Deno.test("UiUtils.debounce(Function, number) - 5", async () => {
  let i = 0;

  UiUtils.debounce((a1: number) => {
    i = i + a1;
  }, 300)(5);
  await UiUtils.wait(400);
  UiUtils.debounce((a1: number) => {
    i = i + a1;
  }, 300)(7);

  await UiUtils.wait(400);
  assertStrictEquals(i, 12);
});

Deno.test("UiUtils.debounce(Function, number) - 6", async () => {
  let i = 0;

  UiUtils.debounce((a1: number, a2: number) => {
    i = i + a1 + a2;
  }, 300)(5, 6);
  await UiUtils.wait(400);
  UiUtils.debounce((a1: number, a2: number) => {
    i = i + a1 + a2;
  }, 300)(7, 8);

  await UiUtils.wait(400);
  assertStrictEquals(i, 26);
});
