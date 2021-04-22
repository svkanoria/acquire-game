import * as R from "remeda";
import { Board } from "./board";
import { Cell } from "./cell";

test("makeBoard", () => {
  const board = Board.makeBoard();
  expect([Object.keys(board.cells).length, board.cells["1A"]]).toStrictEqual([
    108,
    { key: "1A", hasTile: false, hotel: null },
  ]);
});

test("mapCells", () => {
  const board = R.pipe(
    Board.makeBoard(),
    Board.mapCells({ "1A": Cell.placeTile })
  );
  expect([Object.keys(board.cells).length, board.cells["1A"]]).toStrictEqual([
    108,
    { key: "1A", hasTile: true, hotel: null },
  ]);
});

test("mapCell", () => {
  const board = R.pipe(Board.makeBoard(), Board.mapCell("1A", Cell.placeTile));
  expect([Object.keys(board.cells).length, board.cells["1A"]]).toStrictEqual([
    108,
    { key: "1A", hasTile: true, hotel: null },
  ]);
});

test("placeTile", () => {
  const board = R.pipe(
    Board.makeBoard(),
    Board.mapCells({
      "1A": Cell.placeTileAndAssignHotel("A"),
      "1B": Cell.placeTileAndAssignHotel("A"),
    }),
    Board.placeTile("1C")
  );
  expect(board.cells["1C"].hotel).toBe("A");
});
