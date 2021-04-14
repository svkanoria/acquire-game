// *** Assets ***

export type IHotel =
  | "A" // American
  | "C" // Continental
  | "F" // Festival
  | "I" // Imperial
  | "L" // Luxor
  | "T" // Tower
  | "W"; // Worldwide

export interface ICell {
  key: string; // Possible values from '1A' to '12I'
  hasTile: boolean;
  hotel: IHotel | null;
}

export interface Board {
  cells: Record<string, ICell>; // Record key is cell key
}

export interface IAssetHolder {
  shares: Record<IHotel, number>;
  tiles: string[]; // Possible values from '1A' to '12I'
}

export interface IBank extends IAssetHolder {
  hotels: IHotel[];
}

export interface IPlayer extends IAssetHolder {
  id: string;
  money: number;
}

// *** Actions ***

export interface IAction {
  name: string;
  playerIndex: number;
}

export interface IPlayTileAction extends IAction {
  name: "playTile";
}

export interface IMakeHotelAction extends IAction {
  name: "makeHotel";
  triggerTile: string;
}

export interface IMergeHotelsAction extends IAction {
  name: "mergeHotels";
  triggerTile: string;
}

export interface IDecideMergeOrderAction extends IAction {
  name: "decideMergeOrder";
  triggerTile: string;
}

export interface IDecideOnShares extends IAction {
  name: "decideOnShares";
  hotel: IHotel;
}

export interface IBuySharesAction extends IAction {
  name: "buyShares";
}

export interface IDrawTileAction extends IAction {
  name: "drawTile";
}

/// *** Game (combining assets and actions) ***

export interface IGame {
  board: Board;
  bank: IBank;
  players: IPlayer[];
  turnPlayerIndex: number;
  actionStack: IAction[];
}
