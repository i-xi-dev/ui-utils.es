export namespace Geometry2d {
  /**
   * A distance from origin. The "origin" depends on context.
   */
  export type Point = {
    x: number;
    y: number;
  };
  export namespace Point {
    /**
     * @param pointA
     * @param pointB
     * @returns A distance from `pointA` to `pointB`. In other words, the position of `pointB` relative to `pointA`.
     */
    export function distanceBetween(pointA: Point, pointB: Point): Point {
      return {
        x: (pointB.x - pointA.x),
        y: (pointB.y - pointA.y),
      };
    }
  }

  export type Area = {
    width: number;
    height: number;
  };

  export namespace Area {
    /** @deprecated */
    export function diagonal({ width, height }: Area) {
      _assertFinite(width, "width");
      _assertFinite(height, "height");
      _assertNonNegative(width, "width");
      _assertNonNegative(height, "height");

      return Math.sqrt((Math.abs(width) ** 2) + (Math.abs(height) ** 2));
    }
  }

  export type Vector = {
    x: number;
    y: number;
    length: number;
    angle: number;
  };

  export function vector(x: number, y: number): Vector {
    _assertFinite(x, "x");
    _assertFinite(y, "y");

    const length = Math.sqrt((Math.abs(x) ** 2) + (Math.abs(y) ** 2));
    const angle = Math.atan(y / x);
    return {
      x,
      y,
      length,
      angle,
    };
  }

  /**
   * A rectangle with its sides parallel to the x-axis and y-axis.
   * This is equivalent to `(Point & Area)`. `Point` represents the top left vertex of the rectangle.
   */
  export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  export namespace Rect {
    export function centerOf({ x, y, width, height }: Rect): Point {
      _assertFinite(x, "x");
      _assertFinite(y, "y");
      _assertFinite(width, "width");
      _assertFinite(height, "height");
      _assertNonNegative(width, "width");
      _assertNonNegative(height, "height");

      return {
        x: x + (width / 2),
        y: y + (height / 2),
      };
    }
  }
}

function _assertFinite(test: unknown, name: string): void {
  if (Number.isFinite(test) !== true) {
    throw new TypeError(name);
  }
}

function _assertNonNegative(test: number, name: string): void {
  if (test < 0) {
    throw new RangeError(name);
  }
}
