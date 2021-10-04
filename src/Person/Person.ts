import { Coordinates } from '../interfaces/tic-tac-toe.interfaces';
import { Player } from '../Player/Player';

export class Person extends Player {
    constructor(playingFields: string[][] | null[][], player: string) {
        super(playingFields, player);
    }

    public makeMove(coordinate: Coordinates): boolean {
        if (!this.playingFields[coordinate.x][coordinate.y]) {
            this.playingFields[coordinate.x][coordinate.y] = this.player;
            if (this.checkThreeInRowAndDiagonal({ x: coordinate.x, y: coordinate.y })) {
                console.log(`Game over. Win ${this.player} player!`);
                process.exit();
            }
            return true;
        } else {
            console.log('The move is busy. Input value one more time:');
            return false;
        }
    }
}
