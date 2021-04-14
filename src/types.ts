// *** Assets ***

export type Hotel =
  | "A" // American
  | "C" // Continental
  | "F" // Festival
  | "I" // Imperial
  | "L" // Luxor
  | "T" // Tower
  | "W"; // Worldwide

export interface Cell {
  key: string; // Possible values from '1A' to '12I'
  hasTile: boolean;
  hotel: Hotel | null;
}

export interface Board {
  cells: Record<string, Cell>; // Record key is cell key
}

export interface AssetHolder {
  shares: Record<Hotel, number>;
  tiles: string[]; // Possible values from '1A' to '12I'
}

export interface Bank extends AssetHolder {
  hotels: Hotel[];
}

export interface Player extends AssetHolder {
  id: string;
  money: number;
}

// *** Actions ***

export interface Action {
  name: string;
  playerIndex: number;
}

export interface PlayTileAction extends Action {
  name: "playTile";
}

export interface MakeHotelAction extends Action {
  name: "makeHotel";
  triggerTile: string;
}

export interface MergeHotelsAction extends Action {
  name: "mergeHotels";
  triggerTile: string;
}

export interface DecideMergeOrderAction extends Action {
  name: "decideMergeOrder";
  triggerTile: string;
}

export interface DecideOnShares extends Action {
  name: "decideOnShares";
  hotel: Hotel;
}

export interface BuySharesAction extends Action {
  name: "buyShares";
}

export interface DrawTileAction extends Action {
  name: "drawTile";
}

/// *** Game (combining assets and actions) ***

export interface Game {
  board: Board;
  bank: Bank;
  players: Player[];
  turnPlayerIndex: number;
  actionStack: Action[];
}
