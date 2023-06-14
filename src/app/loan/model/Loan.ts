import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';

export class Loan {
  id: number;
  client: Client;
  game: Game;
  startingDate: Date;
  endingDate: Date;
}
