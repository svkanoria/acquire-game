import { IBoard, IHotel } from "../types";
import R from "remeda";
import { Cell } from "./cell";

const getNeighbouringHotels = (cellKey: string) => (
  board: IBoard
): IHotel[] => {
  return R.pipe(
    Cell.getNeighbouringKeys(cellKey),
    R.map((cellKey) => board.cells[cellKey]),
    R.filter((cell) => cell.hotel != null),
    // We use the '!' to tell Typescript that cell.hotel cannot be null here.
    // We know this is true, because we already filtered out the nulls above.
    R.map((cell) => cell.hotel!),
    R.uniq()
  );
};

const getHotelSizes = (board: IBoard): Record<IHotel, number> => {
  return R.pipe(
    Object.values(board.cells),
    R.filter((cell) => cell.hotel != null),
    R.groupBy((cell) => cell.hotel),
    R.mapValues((cells) => cells.length)
  );
};

const getNeighbouringHotelSizes = (cellKey: string) => (
  board: IBoard
): Record<IHotel, number> => {
  return R.pick(getHotelSizes(board), getNeighbouringHotels(cellKey)(board));
};

const placeTile = (tile: string) => (board: IBoard) => {
  board.cells = {
    ...board.cells,
    tile: { ...board.cells[tile], hasTile: true },
  };
  const neighbouringHotels = getNeighbouringHotels(tile)(board);
  if (neighbouringHotels.length === 1) {
    board.cells = {
      ...board.cells,
      tile: { ...board.cells[tile], hotel: neighbouringHotels[0] },
    };
  } else if (neighbouringHotels.length > 1) {
    const neighbouringHotelSizes = getNeighbouringHotelSizes(tile)(board);
    // More to be added
  }
};
