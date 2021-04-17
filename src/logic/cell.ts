import { ICell, ICellCoords, IHotel } from "../types";
import { RExt } from "../remedaExtension";

const placeTile = (cell: ICell): ICell => {
  return { ...cell, hasTile: true };
};

const assignHotel = (hotel: IHotel | null) => (cell: ICell): ICell => {
  if (!cell.hasTile) {
    throw new Error(
      `Cell ${cell.key} has no tile, so cannot assign a hotel to it`
    );
  }
  return { ...cell, hotel };
};

const placeTileAndAssignHotel = (hotel: IHotel) =>
  RExt.compose(assignHotel(hotel), placeTile);

const getNeighbouringKey = (dx: number, dy: number) => (
  key: string
): string | undefined => {
  const coords = getCoords(key);
  const [x, y] = [coords.x + dx, coords.y + dy];
  if (x >= 0 && x <= 11 && y >= 0 && y <= 8) {
    return getKey({ x, y });
  }
};

const getCoords = (key: string): ICellCoords => {
  const row = key.slice(0, key.length - 1);
  return {
    x: parseInt(row, 10) - 1,
    y: key.charCodeAt(key.length - 1) - 65, // 'A' = 65
  };
};

const getKey = (coords: ICellCoords): string => {
  return `${coords.x + 1}${String.fromCharCode(coords.y + 65)}`;
};

const getNeighbouringKeys = (key: string) => {
  return (
    [
      getNeighbouringKey(0, -1),
      getNeighbouringKey(1, 0),
      getNeighbouringKey(0, 1),
      getNeighbouringKey(-1, 0),
    ]
      .map((f) => f(key))
      // Casting as string[], otherwise the type is inferred to be
      // `(string | undefined)`. We're filtering out the `undefined`s, so we
      // know for sure that we'll be left with only strings that exist.
      .filter((c) => c) as string[]
  );
};

export const Cell = {
  placeTile,
  assignHotel,
  placeTileAndAssignHotel,
  getCoords,
  getKey,
  getNeighbouringKeys,
};
