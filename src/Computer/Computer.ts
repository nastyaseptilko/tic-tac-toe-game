import { Player } from '../Player/Player';

export class Computer extends Player {
    constructor(playingFields: string[][] | null[][], player: string) {
        super(playingFields, player);
    }

    public makeMove(): boolean {
        let randomX = this.generateNumber();
        let randomY = this.generateNumber();

        if (!this.playingFields[randomX][randomY]) {
            this.playingFields[randomX][randomY] = this.player;
            if (this.checkThreeInRowAndDiagonal({ x: randomX, y: randomY })) {
                console.log(`Game over. Win ${this.player} player!`);
                process.exit();
            }
            return true;
        } else {
            return this.makeMove();
        }
    }

    private generateNumber(): number {
        return Math.floor(Math.random() * 2) + 1;
    }
}
