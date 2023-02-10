import { assertStrictEquals } from "std/testing/asserts";
import { Geometry2d } from "../mod.ts";

Deno.test("Geometry2d.Point.distanceBetween(object, object)", () => {
  const p1 = { x: 110, y: 220 };
  const p2 = { x: 330, y: 550 };
  const p3 = Geometry2d.Point.distanceBetween(p1, p2);

  assertStrictEquals(p3.x, 220);
  assertStrictEquals(p3.y, 330);
});

Deno.test("Geometry2d.Rect.centerOf(object)", () => {
  const r1 = { x: 110, y: 220, width: 100, height: 100 };
  const p1 = Geometry2d.Rect.centerOf(r1);

  assertStrictEquals(p1.x, 160);
  assertStrictEquals(p1.y, 270);
});
