import { Game } from './Game/Game';

const game = new Game();
process.stdin.pipe(require('split')()).once('data', (line: string) => game.start(line));
console.log('Please enter your sign player:');
