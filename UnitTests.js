const { Chess } = require('./node_modules/chess.js')
const { Chess960 } = require('./Chess960');

//Initialize Original Chess JS game and implement the pieces you would like to randomize
const chess = new Chess();
const chess960 = new Chess960(chess);

chess960.createChessBoard();


//////////////////////////////////////////////////////////
// THESE ARE LOCATED AT THE BOTTOM OF THE CHESS960 PAGE //
//////////////////////////////////////////////////////////


//TEST FOR GAME TO PLAY UNTIL GAME OVER
//PRINTS ALL MOVES VIA ASCII ART
// while (!chess.game_over()) {
//     const moves = chess.moves()
//     const move = moves[Math.floor(Math.random() * moves.length)]
//     chess.move(move)
//     console.log(chess.ascii());
// }