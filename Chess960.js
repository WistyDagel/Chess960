const { Chess } = require('./node_modules/chess.js')

class Chess960 {
    constructor(chess){
        this.chess = chess;
    }

    //Randomizes the special pieces based off the array passed in
    randomizePieces() {
        var count = 1;
        var pieces = ['r', 'r', 'n', 'n', 'b', 'b', 'q', 'k'];
        for (let i = pieces.length; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = pieces[i];
            pieces[i] = pieces[j];
            pieces[j] = temp;
        }
        return pieces.join("");
    }

    findPositions(string){
        var rookCount = 0;
        var bishopCount = 0;
        var knightCount = 0;

        var piecesMap = {
            rook1: '',
            rook2: '',
            king: '',
            bishop1: '',
            bishop2: '',
            queen: '',
            knight1: '',
            knight2: ''
        }

        var pieces = string.split('');
        for (let i = 0; i < pieces.length; i++) {
            const element = pieces[i];
            if(element == 'r'){
                if(rookCount == 1 ){
                    piecesMap.rook2 = i;
                } else {
                    rookCount++;
                    piecesMap.rook1 = i;
                }
            }

            if(element == 'k'){
                piecesMap.king = i;
            }

            if(element == 'b'){
                if(bishopCount == 1 ){
                    piecesMap.bishop1 = i;
                } else {
                    bishopCount++;
                    piecesMap.bishop2 = i;
                }
            }

            if(element == 'q'){
                piecesMap.queen = i;
            }

            if(element == 'n'){
                if(knightCount == 1 ){
                    piecesMap.knight1 = i;
                } else {
                    knightCount++;
                    piecesMap.knight2 = i;
                }
            }
        }
        return piecesMap;
    }

    adjustPositions(piecesMap, newSet){
        var newPiecesSet = newSet.split('');
        console.log(piecesMap);
        console.log(newPiecesSet);

        //Checks to see if the distance between the rooks is shorter than the distance between rook1 and the king
        var rookDistance = Math.abs(piecesMap.rook2 - piecesMap.rook1);
        // console.log(rookDistance);
        var kingDistance = Math.abs(piecesMap.rook1 - piecesMap.king);
        // console.log(kingDistance);
        if(!(piecesMap.rook1 < piecesMap.king && piecesMap.king < piecesMap.rook2)){
            if(((rookDistance) < (kingDistance)) && piecesMap.king != 0){
                if(piecesMap.rook2 == 7){
                    var temp = piecesMap.rook1;
                    piecesMap.rook1 = piecesMap.king;
                    piecesMap.king = temp;
                } else {
                    var temp = piecesMap.rook2;
                    piecesMap.rook2 = piecesMap.king;
                    piecesMap.king = temp;
                }
            } else {
                var temp = piecesMap.rook1;
                piecesMap.rook1 = piecesMap.king;
                piecesMap.king = temp;
            }
        }
        // console.log(piecesMap);

        //Checks to see if the distance between the bishops are even or odd assuring that the pieces are on different colored tiles
        //EVEN
        if(piecesMap.bishop1 % 2 == 0 && piecesMap.bishop2 % 2 == 0){
            if(piecesMap.queen % 2 !== 0){
                newPiecesSet[piecesMap.queen] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'q';
            } else if (piecesMap.knight1 % 2 !== 0){
                newPiecesSet[piecesMap.knight1] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'n';            
            } else if (piecesMap.knight2 % 2 !== 0){
                newPiecesSet[piecesMap.knight2] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'n';
            }
        }
        //ODD 
        else if (piecesMap.bishop1 % 2 !== 0 && piecesMap.bishop2 % 2 !== 0) {
            if(piecesMap.queen % 2 == 0){
                newPiecesSet[piecesMap.queen] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'q';
            } else if (piecesMap.knight1 % 2 == 0){
                newPiecesSet[piecesMap.knight1] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'n';            
            } else if (piecesMap.knight2 % 2 == 0){
                newPiecesSet[piecesMap.knight2] = 'b';
                newPiecesSet[piecesMap.bishop2] = 'n';
            }
        }

        //Adjusts the array according to the new layout following the chess960 ruleset
        for (let i = 0; i < newPiecesSet.length; i++) {
            if(i == piecesMap.rook1 || i == piecesMap.rook2){
                newPiecesSet[i] = 'r';
            }            
            if(i == piecesMap.king){
                newPiecesSet[i] = 'k';
            }
        }

        console.log(newPiecesSet);
        console.log(newPiecesSet.join(""));
        return newPiecesSet.join("");
    }

    createChessBoard() {
        var newSet = this.randomizePieces();
        // console.log(newSet);
        var piecesMap = this.findPositions(newSet);
        // console.log(piecesMap);
        var newLayout = this.adjustPositions(piecesMap, newSet);

        this.chess = new Chess(
            `${newLayout}/pppppppp/8/8/8/8/PPPPPPPP/${newLayout.toUpperCase()} w KQkq - 0 1`
        ); 
        //Prints initial board state
        console.log(this.chess.ascii());        
    }

    executeGame(bool) {
        this.createChessBoard();
        //DOESN'T PRINT GMOVE HISTORY
        while (!this.chess.game_over()) {
            const moves = this.chess.moves();
            const move = moves[Math.floor(Math.random() * moves.length)]
            this.chess.move(move);
            //Prints every move made
            console.log(this.chess.ascii());        
        }
        if(bool) console.log(this.chess.history());        
    }

}

/////////////////////////////////////////////////////
//UNIT TESTS

const chess = new Chess();

const chess960 = new Chess960(chess);

//UNIT TEST 0 - ENSURE CHESS JS IS RUNNING ACCORDINGLY
// console.log(chess.ascii());        

//UNIT TEST 1 - ENSURE RANDOMIZING HAS BEEN EXECUTED CORRECTLY
// var string = chess960.randomizePieces();
// console.log(string);

//UNIT TEST 2 - CREATE THE CHESS BOARD BASED ON THE CHESS960 RULESET 
// chess960.createChessBoard();

//UNIT TEST 3 - CHECK POSITIONs FOR ROOKs, KING AND BISHOPS 
//THIS IS USED FOR ADJUSTING THE SET OF THE PIECES IN ACCORDANCE TO THE RULES
// var val = chess960.findPositions(string);
// console.log(val);

//UNIT TEST 4
//TEST IF KING IS AT POSITION 0
// var value = { rook1: 3, rook2: 5, king: 0, bishop1: 6, bishop2: 2, queen: 4, knight1: 1, knight2: 7 };
// var string = 'knbrqrbn';
// chess960.adjustPositions(value, string);

//UNIT TEST 5
//TEST IF KING IS AT POSITION 7
// var value = { rook1: 0, rook2: 2, king: 7, bishop1: 6, bishop2: 1, queen: 3, knight1: 5, knight2: 4 };
// var string = 'rbrnnqbk';
// chess960.adjustPositions(value, string);

// UNIT TEST 6 - CHECKS FOR BOTH BISHOPS AT SAME TILE COLOR AND IF KNIGHT IS OUTSIDE OF ROOKS
// var value = { rook1: 3, rook2: 6, king: 7, bishop1: 0, bishop2: 2, queen: 4, knight1: 1, knight2: 5 };
// var string = 'bnbrqnrk';
// chess960.adjustPositions(value, string);

//POSSIBILITY OF ROOK 1 OR ROOK 2 AT 7
// var value = { rook1: 7,
//     rook2: 6,
//     king: 3,
//     bishop1: 5,
//     bishop2: 2,
//     queen: 0,
//     knight1: 4,
//     knight2: 1 };
// var string = 'qnbknbrr';
// chess960.adjustPositions(value, string);
// var value = { rook1: 6,
//     rook2: 7,
//     king: 1,
//     bishop1: 5,
//     bishop2: 2,
//     queen: 4,
//     knight1: 3,
//     knight2: 0 };
// var string = 'nkbnqbrr';
// chess960.adjustPositions(value, string);

//UNIT TEST 7
//TEST IF BISHOPS ARE ON THE SAME COLOR TILE
// var value = { rook1: 1,
//     rook2: 6,
//     king: 7,
//     bishop1: 4,
//     bishop2: 0,
//     queen: 2,
//     knight1: 5,
//     knight2: 3 };
// var string = 'brqnbnrk';
// chess960.adjustPositions(value, string);

//UNIT TEST 8 - EXECUTE THE GAME TO ENSURE THE ORGINAL GAME OF CHESS CAN BE PLAYED
//WITHOUT HISTORY
// chess960.executeGame(false);

//UNIT TEST 9 - EXECUTES WITH MOVE HISTORY
// chess960.executeGame(true);