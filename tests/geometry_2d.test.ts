import { assertStrictEquals } from "std/testing/asserts";
import { Geometry2d } from "../mod.ts";

Deno.test("Geometry2d.Point.distanceBetween(object, object)", () => {
  const p1 = { x: 110, y: 220 };
  const p2 = { x: 330, y: 550 };
  const p3 = Geometry2d.Point.distanceBetween(p1, p2);

  assertStrictEquals(p3.x, 220);
  assertStrictEquals(p3.y, 330);
});

Deno.test("Geometry2d.Area.diagonal(object)", () => {
  const a1 = { width: 30, height: 40 };
  const d1 = Geometry2d.Area.diagonal(a1);
  assertStrictEquals(d1, 50);

  const a2 = { width: 30, height: 0 };
  const d2 = Geometry2d.Area.diagonal(a2);
  assertStrictEquals(d2, 30);

  const a3 = { width: 0, height: 40 };
  const d3 = Geometry2d.Area.diagonal(a3);
  assertStrictEquals(d3, 40);
});

Deno.test("Geometry2d.Rect.centerOf(object)", () => {
  const r1 = { x: 110, y: 220, width: 100, height: 100 };
  const p1 = Geometry2d.Rect.centerOf(r1);

  assertStrictEquals(p1.x, 160);
  assertStrictEquals(p1.y, 270);
});
