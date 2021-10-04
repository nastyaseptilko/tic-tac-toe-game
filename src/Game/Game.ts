import { IGame } from '../interfaces/tic-tac-toe.interfaces';
import { Person } from '../Person/Person';
import { Player } from '../Player/Player';
import { Computer } from '../Computer/Computer';

const PLAYER_X_SIGN = 'X';
const PLAYER_0_SIGN = '0';

export class Game implements IGame {
    playingFields: string[][] | null[][] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    player: string = '';
    computerPlayer: string = '';

    public start(line: string): void {
        const input = line.toUpperCase();
        if (input === PLAYER_X_SIGN) {
            this.player = PLAYER_X_SIGN;
            this.computerPlayer = PLAYER_0_SIGN;
        } else if (input === PLAYER_0_SIGN) {
            this.player = PLAYER_0_SIGN;
            this.computerPlayer = PLAYER_X_SIGN;
        } else {
            this.player = input;
            this.computerPlayer = PLAYER_0_SIGN;
        }

        console.log(
            `You are the player under the ${this.player} sign. Make your move (example 0x1y):`,
        );

        process.stdin.pipe(require('split')()).on('data', (line: string) => {
            const person: Player = new Person(this.playingFields, this.player);
            const computer: Player = new Computer(this.playingFields, this.computerPlayer);
            const coordinates: string[] = line.split('');
            const regExp = new RegExp('^[0-2]x[0-2]y$');

            if (!regExp.test(line)) {
                console.error('Invalid format. Expected format: value X value Y');
                return;
            }
            const moveResult = person.makeMove({
                x: Number(coordinates[0]),
                y: Number(coordinates[2]),
            });
            if (moveResult) {
                computer.makeMove();
            }
            this.outputPlayingFields();
        });
    }

    private outputPlayingFields(): void {
        const splitter = '|---|---|---|';
        let line1 = '| ',
            line2 = '| ',
            line3 = '| ';
        this.playingFields.forEach((playingField: string[] | null[]) => {
            line1 += this.generateLine(playingField[0]);
            line2 += this.generateLine(playingField[1]);
            line3 += this.generateLine(playingField[2]);
        });
        console.log(splitter);
        console.log(`${line1}`);
        console.log(splitter);
        console.log(`${line2}`);
        console.log(splitter);
        console.log(`${line3}`);
        console.log(splitter);
    }

    private generateLine(field: string | null): string {
        return `${field || ' '} | `;
    }
}
