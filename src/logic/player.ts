import { IPlayer } from "../types";

const addMoney = (amount: number) => (player: IPlayer): IPlayer => {
  return { ...player, money: player.money + amount };
};
