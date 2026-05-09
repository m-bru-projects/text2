import { games } from '../src/games/index.js';
console.log('Games loaded:', games.length);
games.forEach(g => console.log('-', g.title));
