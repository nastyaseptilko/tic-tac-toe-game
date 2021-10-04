import { Coordinates } from '../interfaces/tic-tac-toe.interfaces';

export abstract class Player {
    playingFields: string[][] | null[][];
    player: string;

    protected constructor(playingFields: string[][] | null[][], player: string) {
        this.playingFields = playingFields;
        this.player = player;
    }

    public abstract makeMove(coordinate?: Coordinates): boolean;

    protected checkThreeInRowAndDiagonal(coordinate: Coordinates): boolean {
        return (
            (this.playingFields[coordinate.x] as any[]).every(
                (value: string | null) => value === this.player,
            ) ||
            (this.playingFields as any[][]).every(
                (column: string[] | null[]) => column[coordinate.y] === this.player,
            ) ||
            (this.playingFields as any[][]).every(
                (column: string[] | null[], index: number) =>
                    this.playingFields[index][index] === this.player,
            ) ||
            (this.playingFields as any[][]).every(
                (column: string[] | null[], index: number) =>
                    this.playingFields[index][this.playingFields.length - 1 - index] ===
                    this.player,
            )
        );
    }
}
