export type Coordinates = {
    x: number;
    y: number;
};

export interface IGame {
    start(line: string): void;
}
