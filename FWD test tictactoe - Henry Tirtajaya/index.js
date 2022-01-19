document.addEventListener('DOMContentLoaded', function() 
{

    var optionsButton = document.getElementById("options_submit");
    // Set up the board
    optionsButton.addEventListener("click", function()
    {
    
        // O Turn
        function isOdd(value){
            if (value % 1 == 0) {
                return true;
            } else {
                return false;
            };
        };

        // X Turn
        function isEven(value){
            if (value % 2 == 0) {
                return true;
            } else {
                return false;
            };
        };
        
        function checkWin(array) { 
            var first = array[0];
        
            if (array[0] == "") {
                return false;
            } else {
                return array.every(function(element) {
                    return element == first;
                });
            };
        };
        
        var boardSize = parseInt(document.getElementById("board_size").value); // Set board size, value parsed to integer
        var gameBoard = [];
        
        // create variable numberSquare, which is gameboard size squared
        var numberSquare = (boardSize * boardSize);
        
        // Create gameboard array containing [] of board size squared
        for (var i = 0; i < numberSquare; i++) {
            gameBoard.push(i);
        };
        
        // Create a wrapper div called "board" inside of "tictactoe" div
        document.getElementById("tictactoe").innerHTML = '<div id="board"></div>';
        
        // Store board div inside of a variable
        var board = document.getElementById("board");
        
        board.style.margin = '0 auto'; // Center
        board.style.height = (80 * boardSize + 20) + 'px';
        board.style.width = (80 * boardSize + 20) + 'px';
    
        for (var i = 0; i < numberSquare; i++) {
            board.innerHTML += '<div class="square"></div>'; // add += so the divs not overwrite each other
        };
        
        // Store square divs in a variable
        var squares = document.getElementsByClassName("square");
        
        // Square div styling
        for (var i = 0; i < numberSquare; i++) {
            // set div squares to 80 x 80
            squares[i].style.height = '80px';
            squares[i].style.width = '80px';	
            squares[i].style.border = '1px solid black';
            squares[i].style.float = "left";
            // Set unique DIV IDs to each square 
            squares[i].setAttribute("id", i.toString());
        };
        
        var whoseTurn = document.getElementById("whoseTurn"); // Turn variable
        
        // After board is made, indicate who goes first
        whoseTurn.style.color = "black";
        whoseTurn.innerHTML = "X's Turn";
        
        // Declare a global click counter
        var boardClicks = 0;
        
        // If board is clicked, increment global click counter
        board.addEventListener("click", function() {
        if (determineWinner()) { // determineWinner will return true if it finds a winning combination
            whoseTurn.style.color = "blue";
            whoseTurn.innerHTML = winPlayer[0] + ' WIN!';
        } else if (isEven(boardClicks)) {
            whoseTurn.style.color = "red";
            whoseTurn.innerHTML = "O's Turn";
        } else {
            whoseTurn.style.color = "black";
            whoseTurn.innerHTML = "X's Turn";
        };
        boardClicks++;
        }); // End board click function
        
        // Make an array to hold square click data
        var squareClicks = [];
        
        // Set each square to 0
        for (var i = 0; i < numberSquare; i++) {
            squareClicks[i] = 0;
        };
        
        var winPlayer; // Variable to store winning combination
        
        // START DETERMINE WINNER
        var determineWinner = function() {
            // Check for win by row
            for (i = 0; i < numberSquare; i += 1) { // iterate entire board
                if ((i % boardSize) == 0) {
                    var rowCheck = [];
                    for (var sqNum = i; sqNum < (i + boardSize); sqNum += 1) {	
                        rowCheck.push(squares[sqNum].innerHTML);
                    };
        
                    if (checkWin(rowCheck)) {
                        winPlayer = rowCheck; // Push winning player
                        return true;
                    };
                };
            };

            // Check for win by column
            for (i = 0; i < numberSquare; i += 1) {
                if (i < boardSize) { // 
                    var colCheck = [];
                    for (var sqNum = i; sqNum < numberSquare; sqNum += boardSize) {
                        colCheck.push(squares[sqNum].innerHTML);
                    };
                    
                    if (checkWin(colCheck)) {
                        winPlayer = colCheck;
                        return true;
                    };	
                };
            };
            // Check for win by left diagonal
            var diag1Check = [];
            for (i = 0; i < numberSquare; i += 1) { // first iteration over board
                if ((i % (boardSize + 1)) == 0) { // if iterator % BOARDSIZE + 1 = 0 to left diag
                    diag1Check.push(squares[i].innerHTML);
                };
            };
            if (checkWin(diag1Check)) {
                winPlayer = diag1Check;
                return true;
            };
            // Check for win by right diagonal
            var diag2Check = []; 
            for (i = (boardSize - 1); i < (numberSquare - 1); i += 1) {
                if ((i % (boardSize - 1)) == 0) { // if iterator % BOARDSIZE - 1 = 0 to right diag
                    diag2Check.push(squares[i].innerHTML);
                };
            };
            if (checkWin(diag2Check)) {
                winPlayer = diag2Check;
                return true;
            };
        }; // END DETERMINE WINNER
        
        // Count sq clicks
        var countClicks = function() {
            var divID = this.getAttribute("id");
            squareClicks[divID] += 1;
            // If global click is odd and local click is = 1, change div to 'X' 
            if (isEven(boardClicks) && squareClicks[divID] == 1) {
                this.innerHTML = 'X';
                console.log("a");
            // If global click is even and local click is = 1, change div to 'O'
            } else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
                this.innerHTML = 'O';
                this.style.color = "red";
                console.log("b");
            // If local click is greater than 1, alert player and minus 1 from global clicks
            } else if (!determineWinner()){
                alert('You cannot move there. That space is taken.');
                boardClicks -= 1;
                console.log("c");
            }else {
                console.log("d");
            };
            // Check winner, if true, lock all local clicks
            if (determineWinner()) {
                for (var i = 0; i < numberSquare; i++) {
                    console.log(squareClicks[i]);
                    squareClicks[i] = 2;
                    console.log("e");
                };
                console.log("f");
            };
        };
        
            // Add local click counter to each square on the board
            for (var i = 0; i < numberSquare; i++) {
                squares[i].addEventListener("click", countClicks);
                console.log("g");
            };
    }); 
});