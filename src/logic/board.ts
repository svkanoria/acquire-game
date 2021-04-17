import { IBoard, ICell, IHotel } from "../types";
import * as R from "remeda";
import { Cell } from "./cell";
import { RExt } from "../remedaExtension";

const makeBoard = (): IBoard => {
  return {
    cells: R.pipe(
      R.range(0, 12).map((x) =>
        R.range(0, 9).map((y) => ({
          x,
          y,
        }))
      ),
      R.flatten(),
      R.map(Cell.getKey),
      R.mapToObj((key) => [key, { key, hasTile: false, hotel: null }])
    ),
  };
};

const mapAllCells = (f: (cell: ICell) => ICell) => (board: IBoard): IBoard => {
  return { ...board, cells: R.mapValues(board.cells, f) };
};

const mapCells = (fs: Record<string, (cell: ICell) => ICell>) =>
  mapAllCells((cell: ICell) => (fs[cell.key] ?? R.identity)(cell));

const mapCell = (cellKey: string, f: (cell: ICell) => ICell) => (
  board: IBoard
): IBoard => {
  return {
    ...board,
    cells: { ...board.cells, [cellKey]: f(board.cells[cellKey]) },
  };
};

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

const placeTile = (cellKey: string) => (board: IBoard) => {
  let mBoard = board;
  mBoard = mapCell(cellKey, Cell.placeTile)(mBoard);
  const neighbouringHotels = getNeighbouringHotels(cellKey)(mBoard);
  if (neighbouringHotels.length === 1) {
    mBoard = mapCell(cellKey, Cell.assignHotel(neighbouringHotels[0]))(mBoard);
  } else if (neighbouringHotels.length > 1) {
    const tooLargeNeighbouringHotels = R.pipe(
      getHotelSizes(mBoard),
      R.pick(neighbouringHotels),
      RExt.pickBy((size) => size >= 11)
    );
    if (Object.values(tooLargeNeighbouringHotels).length > 1) {
      throw new Error(
        `Unplayable merging tile ${cellKey}. Hotels ${Object.keys(
          tooLargeNeighbouringHotels
        ).join(", ")} are too large, they have sizes ${Object.values(
          tooLargeNeighbouringHotels
        ).join(", ")} respectively.`
      );
    }
  }
  return mBoard;
};

const removeHotel = (hotel: IHotel) =>
  mapAllCells((cell) =>
    cell.hotel === hotel ? Cell.assignHotel(null)(cell) : cell
  );

export const Board = {
  makeBoard,
  mapAllCells,
  mapCells,
  mapCell,
  placeTile,
  removeHotel,
};
