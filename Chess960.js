const { Chess } = require('./node_modules/chess.js')

class Chess960 {
    constructor(chess){
        this.chess = chess;
    }

    //Randomizes the special pieces based off the array passed in
    randomizePieces() {
        var pieces = ['r', 'r', 'n', 'n', 'b', 'b', 'q', 'k'];
        for (let i = pieces.length; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = pieces[i];
            pieces[i] = pieces[j];
            pieces[j] = temp;
        }
        return pieces.join("");
    }

    createChessBoard() {
        var newSet = this.randomizePieces();

        this.chess = new Chess(
            `${newSet}/pppppppp/8/8/8/8/PPPPPPPP/${newSet.toUpperCase()} w KQkq - 0 1`
        ); 
        //Prints initial board state
        console.log(this.chess.ascii());        
    }

    executeGame() {
        this.createChessBoard();
        while (!this.chess.game_over()) {
            const moves = this.chess.moves();
            const move = moves[Math.floor(Math.random() * moves.length)]
            this.chess.move(move);
            //Prints every move made
            console.log(this.chess.ascii());        
        }
    }

}

const chess = new Chess();

const chess960 = new Chess960(chess);

//UNIT TEST 1 - ENSURE RANDOMIZING HAS BEEN EXECUTED CORRECTLY
var string = chess960.randomizePieces();
console.log(string);

//UNIT TEST 2 - CREATE THE CHESS BOARD BASED ON THE CHESS960 RULESET 
chess960.createChessBoard();

//UNIT 3 - EXECUTE THE GAME TO ENSURE THE ORGINAL GAME OF CHESS CAN BE PLAYED
// chess960.executeGame();

// const randomizePieces = () => {
//     var newSet = pieces;
//     for (let i = newSet.length; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = newSet[i];
//         newSet[i] = newSet[j];
//         newSet[j] = temp;
//     }
//     return newSet.join("");
// }

// var newSet = randomizePieces();

// const chess = new Chess(
//     `${newSet}/pppppppp/8/8/8/8/PPPPPPPP/${newSet.toUpperCase()} w KQkq - 0 1`
// );
// console.log(chess.ascii());

// while (!chess.game_over()) {
//     const moves = chess.moves()
//     const move = moves[Math.floor(Math.random() * moves.length)]
//     chess.move(move)
// }
// console.log(chess.history());
// console.log(chess.ascii());