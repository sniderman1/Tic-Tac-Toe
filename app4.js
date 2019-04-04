// Tic Tac Toe computer learning game......................................................
//row 1
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
//row 2
var s4 = document.getElementById("s4");
var s5 = document.getElementById("s5");
var s6 = document.getElementById("s6");
//row 3
var s7 = document.getElementById("s7");
var s8 = document.getElementById("s8");
var s9 = document.getElementById("s9");

var resetButton = document.getElementById("reset");
var messageBoard = document.getElementById("message");


//Arrays for the board -----------------------------------------------------------------------------------------------------------

var openSpaces = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
var playerSpaces =[];
var computerSpaces =[];

//individual square interactions --------------------------------------------------------------------------------------------------

function squre1(){
    currentSquare = s1;
    consolePlayerLable();
    console.log("square1 selected");  
    playerOperations(); 
}

function squre2(){
    currentSquare = s2;
    consolePlayerLable();
    console.log("square2 selected");
    playerOperations();
}

function squre3(){
    currentSquare = s3;
    consolePlayerLable();
    console.log("square3 selected");
    playerOperations();
}

function squre4(){
    currentSquare = s4;
    consolePlayerLable();
    console.log("square4 selected");
    playerOperations();
}

function squre5(){
    currentSquare = s5;
    consolePlayerLable();
    console.log("square5 selected");
    playerOperations();
}

function squre6(){
    currentSquare = s6;
    consolePlayerLable();
    console.log("square6 selected");
    playerOperations();
}

function squre7(){
    currentSquare = s7;
    consolePlayerLable();
    console.log("square7 selected");
    playerOperations();
}

function squre8(){
    currentSquare = s8;
    consolePlayerLable();
    console.log("square8 selected");
    playerOperations();
}

function squre9(){
    currentSquare = s9;
    
    console.log("square9 selected");    
    playerOperations();
}

// Prints out this lable in the console when it's the players turn ---------------------------------------------------------------------------

function consolePlayerLable(){
    console.log("******************************************");
    console.log("     (Player's turn)          Move: " + moveNumber);
    console.log("------------------------------------------");
}

// The beginning of the game starts here. The computers first move and setting the board (if the first move is not in the center of the board) functions are ran here.

var isItFirstMove = true;
var moveNumber = 0;
var isFirstMoveCenter = false;

function computerFirst(){
    if(isItFirstMove === true){
        computerFirstMove();
        createComputerSquare();
        if(isFirstMoveCenter === false){
            setBoard();      
        }
        moveNumber++;    
    }
    else{
        console.log("First move already made.");
    }
}

//Variables group the squares on the board into three groups -------------------------------------------------------------
var corrnerSquares = [s1, s3, s7, s9];
var edgeSquares = [s2, s4, s6, s8];
var centerSquare = s5;
//Variables that will contain all the moves made thoughout the game  -----------------------------------------------------
var firstMove ="";
var move2 = 0;
var move3 = 0;
var move4 = 0;
var move5 = 0;
var move6 = 0;
var move7 = 0;
var move8 = 0;
var move9 = 0;


//Chooses randomly where to place the computers first move ----------------------------------------------------------
function computerFirstMove(){
    var y ="";        
    y = Math.floor(Math.random()*7);
    if(y === 0){
        firstMove = corrnerSquares[y];
    } 
    if(y === 1){
        firstMove = corrnerSquares[y];
    } 
    if(y === 2){
        firstMove = corrnerSquares[y];
    } 
    if(y === 3){
        firstMove = corrnerSquares[y];
    } 
    if(y >= 4){
        firstMove = centerSquare;
        isFirstMoveCenter = true;  
    }
    currentSquare = firstMove;
    isItFirstMove = false;
}

// Adds the players move to the "move" variables ----------------------------------------------------------------------------------
function addMove(){
    if(moveNumber === 2){
        move2 = currentSquare;
    }
    if(moveNumber === 4){
        move4 = currentSquare;
    }
    if(moveNumber === 6){
        move6 = currentSquare;
    }
    if(moveNumber === 8){
        move8 = currentSquare;
    }
}

//Restarts the game ------------------------------------------------------------------------------------------------------------------------

resetButton.addEventListener("click", function(){
    for(var i = 0; i < computerSpaces.length; i++){
       computerSpaces[i].classList.remove("computerSquare");
    }
    for(var i = 0; i < playerSpaces.length; i++){
        playerSpaces[i].classList.remove("playerSquare");
     }
    openSpaces = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
    playerSpaces =[];
    computerSpaces =[];
    moveNumber = 0;
    isGameover = false;
    isItFirstMove = true;
    isFirstMoveCenter = false;
    computerFirst();
});

// Variables for the computer and player operations --------------------------------------------------------------------------------

var indexOf = "";
var currentSquare ="";
var isGameover = false;
var isSquareOccupied = false;

// This function is triggered when one of the squares are clicked. First checks to see if the square that was clicked, then it checks if the computer has made the
// first move yet, then checks if the game is over. If these are all false then it runs the createPlayer function and takes that square out of the openSpaces array.
// Then it runs the computer functions. 

function playerOperations(){
    checkIfSquareIsOccupies();
    if(isItFirstMove === false){
        if(isSquareOccupied === false){
            if(isGameover === false){
                moveNumber++;
                addMove();
                if(moveNumber === 2){
                    chooseStrategy();
                }
                createPlayerSquare();
                checkPlayerForWin();
                if(isGameover === false){
                    if(isGameover === false){
                    computerOperations();
                    checkOpenSpaces();  
                    }
                }  
            }   
        }   
        else{
            console.log("Already occupied");
            isSquareOccupied = false;
        }
    }
    else{
        console.log("Computer has not made move yet.");
    }

}

// crates the player square, removes the square from the openSquares array then adds it to the playerSquares array
function createPlayerSquare(){
    playerSpaces.push(currentSquare);
    currentSquare.classList.add("playerSquare");
    indexOf = openSpaces.indexOf(currentSquare);
    if(indexOf !== -1){
        openSpaces.splice(indexOf, 1);  
    }
    else{
        console.log("Already removed from the list");
    }
}

// Creates the computer square --------------------------------------------------------------------------------------------------------------
function createComputerSquare(){
    computerSpaces.push(currentSquare);
    currentSquare.classList.add("computerSquare");
    indexOf = openSpaces.indexOf(currentSquare);
    openSpaces.splice(indexOf, 1); 
}

//Checks to see if the square that the player is clicking on is occupied. If so then this function prevents the computer from making a move.
function checkIfSquareIsOccupies(){
    if(computerSpaces.includes(currentSquare) === true || playerSpaces.includes(currentSquare) === true){
        isSquareOccupied = true;
    }
}

// Checks if the openSpace array has anymore squares left. If not gameOver function runs and the game is ended --------------------------------
function checkOpenSpaces(){
    if(openSpaces.length === 0){
        console.log("Tie");
        gameMessage = "Tie";
        message();
        gameOver()
    }
}

// checks the player array to see if the player has made a winning move -----------------------------------------------------------------------
function checkPlayerForWin(){
    if( playerSpaces.includes(s1) && playerSpaces.includes(s2) && playerSpaces.includes(s3) ||
        playerSpaces.includes(s4) && playerSpaces.includes(s5) && playerSpaces.includes(s6) ||
        playerSpaces.includes(s7) && playerSpaces.includes(s8) && playerSpaces.includes(s9) ||
        playerSpaces.includes(s1) && playerSpaces.includes(s4) && playerSpaces.includes(s7) ||
        playerSpaces.includes(s2) && playerSpaces.includes(s5) && playerSpaces.includes(s8) ||
        playerSpaces.includes(s3) && playerSpaces.includes(s6) && playerSpaces.includes(s9) ||
        playerSpaces.includes(s1) && playerSpaces.includes(s5) && playerSpaces.includes(s9) ||
        playerSpaces.includes(s3) && playerSpaces.includes(s5) && playerSpaces.includes(s7)){
        console.log("Player WINS!!!!!!!!!!!!!!!!!!!!!!!");
        gameMessage = "Player Wins!";
        message();
        gameOver();
    }

}

// checks the computer array to see if the computer has made a winning move ---------------------------------------------------------------------
function checkComputerForWin(){
    if( computerSpaces.includes(s1) && computerSpaces.includes(s2) && computerSpaces.includes(s3) ||
        computerSpaces.includes(s4) && computerSpaces.includes(s5) && computerSpaces.includes(s6) ||
        computerSpaces.includes(s7) && computerSpaces.includes(s8) && computerSpaces.includes(s9) ||
        computerSpaces.includes(s1) && computerSpaces.includes(s4) && computerSpaces.includes(s7) ||
        computerSpaces.includes(s2) && computerSpaces.includes(s5) && computerSpaces.includes(s8) ||
        computerSpaces.includes(s3) && computerSpaces.includes(s6) && computerSpaces.includes(s9) ||
        computerSpaces.includes(s1) && computerSpaces.includes(s5) && computerSpaces.includes(s9) ||
        computerSpaces.includes(s3) && computerSpaces.includes(s5) && computerSpaces.includes(s7)){
        console.log("Computer WINS!!!!!!!!!!!!!!!!!!!!!!!");
        gameMessage = "Computer Wins!";
        message();
        gameOver();
    }
}

//writes a message on the document ------------------------------------------------------------------------------------
var gameMessage = ""; 

function message() {
    var x = document.createElement("br");
    var t = document.createTextNode("Game: " + gameNumber + " " + gameMessage);
    messageBoard.appendChild(t);
    messageBoard.appendChild(x);
    document.body.appendChild(messageBoard);
  }

// Computer ueses preprogrammed strategy to make it's moves ------------------------------------------------------------
function computerOperations(){
    console.log("******************************************");
    console.log("     (Computer's Move)        Move: " + moveNumber);  
    console.log("------------------------------------------");
    moveNumber++;
    chosenStrategy();
    setComputerMove();
    createComputerSquare(); 
    checkComputerForWin(); 
}

// adds the computers move to the currentSquare variable so that the square can be processed in the createComputerSquare function.
function setComputerMove(){
    if(moveNumber === 3){
        currentSquare = move3;
    }
    if(moveNumber === 5){
        currentSquare = move5;
    }
    if(moveNumber === 7){
        currentSquare = move7;
    }
    if(moveNumber === 9){
        currentSquare = move9;
    }
}

// variable that will contain the preprogrammed strategy functions. This variable is set in the chooseStrategy function ---------------------
var chosenStrategy ="";

// Chooses the proper strategy based on the players first move (move 2). ---------------------------------------------------------
function chooseStrategy(){             
    console.log("###############################################################");
    console.log("Choosing strategy...");
    if(firstMove === centerSquare){
        chooseBoardSetupForCenter();
        if(corrnerSquares.includes(move2) === true){
            chosenStrategy = centerCorrnerStrategy;
            console.log("Center corrner strategy working (centerCorrnerStartegy)");
        }
        else{
            if(edgeSquares.includes(move2) === true){
                chosenStrategy = centerEdgeStrategy; 
                console.log("Center edge stratey working (centerEdgeStrategy)");   
            }
            else{
                console.log("No strategy chosen...");
            }
        }  
    }
    else{
        if(move2 === eC1 || move2 === eC2){
        chosenStrategy = corrnerEdgeStrategyEC;
        console.log("Edge close strategy working (corrnerEdgeStrategyEC)");
        }
        else{
            if(move2 === c1 || move2 === c2){
            chosenStrategy = corrnerEdgeStrategyC;
            console.log("Corrner strategy working (corrnerEdgeStrategyC)");
            }
            else{
                if(move2 === eF1 || move2 === eF2){
                chosenStrategy = corrnerEdgeStrategyEF;
                console.log("Edge far strategy working (corrnerEdgeStrategyEF)");
                }
                else{
                    if(move2 === cO){
                    chosenStrategy = corrnerEdgeStrategyOC;
                    console.log("Oppoist corrner strategy working (corrnerEdgeStrategyOC)");
                    }      
                    else{
                        if(move2 === s5){
                            chosenStrategy = corrnerCenterStrategy;
                            console.log("Center stratey working (corrnerCenterStrategy)");
                        }
                        else{
                        console.log("No strategy chosen...");
                        }
                    }               
                }
                  
            }
  
        }

    }
    console.log("###############################################################");

}

// If the computers first move is in the center of the board than the board setup will not be made untill the player has made their first move.
// This way the stratigy function for this move would'nt have to be so large. Not every possible move has to be programed into this function since
//the board is postioned around the players first move. 
function chooseBoardSetupForCenter(){
    if(move2 === s1){
        corrnerS1();
        move2 = X; 
    }
    if(move2 === s2){
        corrnerS1();
        move2 = eC1;
    }
    if(move2 === s3){
        corrnerS3();
        move2 = X;
    }
    if(move2 === s6){
        corrnerS3();
        move2 = eC1;
    }
    if(move2 === s7){
        corrnerS7();
        move2 = X;
    }
    if(move2 === s4){
        corrnerS7();
        move2 = eC1;  
    }
    if(move2 === s9){
        corrnerS9();
        move2 = X;
    }
    if(move2 === s8){
        corrnerS9();
        move2 = eC1;
    }
}

//edge close 1
var eC1 ="";
//edge close 2
var eC2 ="";
//edge Far 1
var eF1 ="";
//edge Far 2
var eF2 ="";
//correner 1
var c1 ="";
//corrner 2
var c2 ="";
//corrner opposite
var cO ="";
//main position
var X  ="";

// This sets the board position if the computers first move is in one of the correners ----------------------------------------------
function setBoard(){
    if(firstMove === corrnerSquares[0]){
        corrnerS1();
    }
    if(firstMove === corrnerSquares[1]){
        corrnerS3();
    }
    if(firstMove === corrnerSquares[2]){
        corrnerS7();
    }
    if(firstMove === corrnerSquares[3]){
        corrnerS9();
    }
}

// Computers preprogrammed strategies ##################################################################################################################################

function centerEdgeStrategy(){
    move3 = c2;
    console.log("Path1 move3 = c2");
    if(move4 === c1){
        move5 = X;
        console.log("Path1.1 move5 = X");
        if(move6 === cO){
            move7 = eC2;
            console.log("Path1.1.1 move7 = eC2 <<Winning move");
        }
        else{
            move7 = cO;
            console.log("Path1.1.1 move7 = oC <<Winning move");
        }
    }
    else{
        move5 = c1;
        console.log("Path1.2 move5 = c1");
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function centerCorrnerStrategy(){
    move3 = cO;
    console.log("Path1 move3 = cO");
    if(move4 === eC1){
        move5 = c1;
        console.log("Path1.1 move5 = c1");
        if(move6 === eF1){
            move7 = c2;
            console.log("Path1.1.1 move7 = c2 <<Winning move");
        }
        else{
            move7 = eF1;
            console.log("Path1.1.2 move7 = eF1 <<Winning move");
        }
    }
    if(move4 === eC2){
        move5 = c2;
        console.log("Path1.2 move5 = c2");
        if(move6 === eF2){
            move7 = c1;
            console.log("Path1.2.1 move7 = c1 <<Winning move");
        }
        else{
            move7 = eF2;
            console.log("Path1.2.2 move7 = eF2 <<Winning move");
        }
    }
    if(move4 === c1){
        move5 = eC1;
        console.log("Path1.3 move5 = eC1");
        if(move6 === eF2){
            move7 = eC2;
            console.log("Path1.3.1 move7 = eC2 <<Winning move");
            if(move8 === c2){
                move9 = eF1;
                console.log("Path1.3.1.1 move9 = eF1 <<Tie");
            }
            else{
                move9 = c2;
                console.log("Path1.3.1.2 move9 = c2 <<Tie");
            }
        }
        else{
            move7 = eF2;
            console.log("Path1.3.2 move7 = eF2 <<Winning move");
        }
    }
    if(move4 === c2){
        move5 = eC2;
        console.log("Path1.4 move5 = eC2");
        if(move6 === eF1){
            move7 = eC1;
            console.log("Path1.4.1 move7 = eC1 <<Winning move");
            if(move8 === c1){
                move9 = eF2;
                console.log("Path1.4.1.1 move9 = eF2 <<Tie");
            }
            else{
                move9 = c1;
                console.log("Path1.4.1.2 move9 = c1 <<Tie");
            }
        }
        else{
            move7 = eF1;
            console.log("Path1.4.2 move7 = eF1 <<Winning move");
        }
    }
    if(move4 === eF1){
        move5 = c2;
        console.log("Path1.5 move5 = c2");
        if(move6 === c1){
            move7 = eF2;
            console.log("Path1.5.1 move7 = eF2 <<Winning move");
        }
        else{
            move7 = c1;
            console.log("Path1.5.2 move7 = c1 <<Winning move");
        }
    }
    if(move4 === eF2){
        move5 = c1;
        console.log("Path1.6 move5 = c1");
        if(move6 === c2){
            move7 = eF1;
            console.log("Path1.6.1 move7 = eF1 <<Winning move");
        }
        else{
            move7 = c2;
            console.log("Path1.6.2 move7 = c2 <<Winning move");
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function corrnerCenterStrategy(){
    move3 = cO;
    console.log("Path1 move3 = cO");
    if(move4 === c1){
        move5 = c2;
        console.log("Path 1.1: move5 = c2");
        if(move6 === eF2){
            //Win.......................
            move7 = eC2;
            console.log("Path 1.1.1: move7 = eC2 <<Winning move");
        }
        else{
            //Win.......................
            move7 = eF2;
            console.log("Path 1.1.2: move7 = eF2 <<Winning move");    
        }
    }
    if(move4 === c2){
        move5 = c1;
        console.log("Path 1.2: move5 = c1");
        if(move6 === eF1){
            //Win.......................
            move7 = eC1;
            console.log("Path 1.2.1: move7 = eC1 <<Winning move");
        }
        else{
            //Win.......................
            move7 = eF1;
            console.log("Path 1.2.2: move7 = eF1 <<Winning move");
        }
    // ================================================================
    }
    if(move4 === eC1){
        move5 = eF2;
        console.log("Path 1.3: move5 = eF2");
        if(move6 === c2){
            move7 = c1
            console.log("Path 1.3.1: move7 = c1");
            if(move8 === eC2){
                //Tie.......................
                move9 = eF1;
                console.log("Path 1.3.1.1: move9 = eF1 <<Tie");
            }
            if(move8 === eF1){
                //Tie.......................
                move9 = eC2;
                console.log("Path 1.3.1.2: move9 = eC2 <<Tie");
            }
        }
        else{
            //Win.......................
            move7 = c2;
            console.log("Path 1.3.2: move7 = c2 <<Winning move");
        }
    } 
    // =============================================================
    if(move4 === eF2){
        move5 = eC1;
        console.log("Path 1.4: move5 = eC2");
        if(move6 === c1){
            move7 = c2
            console.log("Path 1.4.1: move7 = c2");
            if(move8 === eC2){
                //Tie.......................
                move9 = eF1;
                console.log("Path 1.4.1.1: move9 = eF1 <<Tie");
            }
            if(move8 === eF1){
                //Tie.......................
                move9 = eC2;
                console.log("Path 1.4.1.2: move9 = eC2 <<Tie");
            }
        }
        else{
            //Win.......................
            move7 = c1;
            console.log("Path 1.4.2: move7 = c1 <<Winning move");
        }
    }
    // =============================================================
    if(move4 === eC2){
        move5 = eF1;
        console.log("Path 1.5: move5 = eF1");
        if(move6 === c1){
            move7 = c2
            console.log("Path 1.5.1: move7 = c2");
            if(move8 === eC1){
                //Tie.......................
                move9 = eF2;
                console.log("Path 1.5.1.1: move9 = eF2 <<Tie");
            }
            if(move8 === eF2){
                //Tie.......................
                move9 = eC1;
                console.log("Path 1.5.1.2: move9 = eC1 <<Tie");
            }
        }
        else{
            //Win.......................
            move7 = c1;
            console.log("Path 1.5.2: move7 = c1 <<Winning move");
        }
    }
    // ==========================================================
    if(move4 === eF1){
        move5 = eC2;
        console.log("Path 1.6: move5 = eC2");
        if(move6 === c2){
            move7 = c1
            console.log("Path 1.6.1: move7 = c1");
            if(move8 === eC1){
                //Tie.......................
                move9 = eF2;
                console.log("Path 1.6.1.1: move9 = eF2 <<Tie");
            }
            if(move8 === eF2){
                //Tie.......................
                move9 = eC1;
                console.log("Path 1.6.1.2: move9 = eC1 <<Tie");
            }
        }
        else{
            //Win.......................
            move7 = c2;
            console.log("Path 1.6.2: move7 = c2 <<Winning move");
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function corrnerEdgeStrategyEC(){
    if(move2 === eC1){
        move3 = c2;
        console.log("Path 1: move3 = c2");
        if(move4 === eC2){
            move5 = cO;
            console.log("Path 1.1: move5 = cO");
            if(move6 === s5){
                //Win.......................
                move7 = eF2;
                console.log("Path 1.1.1: move7 = eF2 <<Winning move");
            }
            else{
                //Win.......................
                move7 = s5;
                console.log("Path 1.1.2: move7 = s5 <<Winning move");  
            }

        }
        else{
            //Win.......................
            move5 = eC2;
            console.log("Path 1.2: move5 = eC2 <<Winning move");
        }
    }
    if(move2 === eC2){
        move3 = c1;
        console.log("Path 2: move3 = c1");
        if(move4 === eC1){
            move5 = cO;
            console.log("Path 2.1: move5 = cO");
            if(move6 === s5){
                //Win.......................
                move7 = eF1;
                console.log("Path 2.1.1: move7 = eF1 <<Winning move");
            }
            else{
                //Win.......................
                move7 = s5;
                console.log("Path 2.1.2: move7 = s5 <<Winning move");
            }
        }
        else{
            //Win.......................
            move5 = eC1;
            console.log("Path 2.2: move5 = eC1 <<Winning move");
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function corrnerEdgeStrategyC(){
    if(move2 === c1){
        move3 = c2;
        console.log("Path 1: move3 = c2");
        if(move4 === eC2){
            move5 = cO;
            console.log("Path 1.1: move5 = cO");
            if(move6 === s5){
                //Win.......................
                move7 = eF2;
                console.log("Path 1.1.1: move7 = eF2 <<Winning move");
            }
            else{
                //Win.......................
                move7 = s5;
                console.log("Path 1.1.2: move7 = s5 <<Winning move");
            }
        }
        else{
            //Win.......................
            move5 = eC2;
            console.log("Path 1.2: move5 = eC2 <<Winning move");
        }
    }
    if(move2 === c2){
        move3 = c1;
        console.log("Path 2: move3 = c1");
        if(move4 === eC1){
            move5 = cO;
            console.log("Path 2.1: move5 = cO");
            if(move6 === s5){
                //Win.......................
                move7 = eF1;
                console.log("Path 2.1.1: move7 = eF1 <<Winning move");
            }
            else{
                //Win.......................
                move7 = s5;
                console.log("Path 2.1.2: move7 = s5 <<Winning move");
            }
        }
        else{
            //Win.......................
            move5 = eC1;
            console.log("Path 2.2: move5 = eC1 <<Winning move");
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function corrnerEdgeStrategyEF(){
    if(move2 === eF1){
        move3 = c1;
        console.log("Path 1: move3 = c1");
        if(move4 === eC1){
            move5 = c2;
            console.log("Path 1.1: move5 = c2");
            if(move6 === eC2){
                //Win.......................
                move7 = s5;
                console.log("Path 1.1.1: move7 = s5 <<Winning move");
            }
            else{
                //Win.......................
                move7 = eC2;
                console.log("Path 1.1.2: move7 = eC2 <<Winning move");
            }

        }
        else{
            //Win.......................
            move5 = eC1;
            console.log("Path 1.2: move5 = eC1 <<Winning move");
        } 
    }
    if(move2 === eF2){
        move3 = c2;
        console.log("Path 2: move3 = c2");
        if(move4 === eC2){
            move5 = c1;
            console.log("Path 2.1: move5 = c1");
            if(move6 === s5){
                //Win.......................
                move7 = eC1;
                console.log("Path 2.1.1: move7 = eC1 <<Winning move");
            }
            else{
                //Win.......................
                move7 = s5;
                console.log("Path 2.1.2: move7 = s5 <<Winning move");   
            }
        } 
        else{
            //Win........................
            move5 = eC2;
            console.log("Path 2.2: move5 = eC2 <<Winning move");
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
function corrnerEdgeStrategyOC(){
    move3 = c1;
    if(move4 === eC1){
        move5 = c2;
    }
    if(move4 !== eC1){
        //Win.......................
        move5 = eC1;
    }
    if(move6 === eC2){
        //Win.......................
        move7 = s5;
    }
    if(move6 === s5){
        console.log("Working...........");
        //Win.......................
        move7 = eC2;
    }
    if(move6 !== eC2 && move6 !== s5){
        //Win.......................
        move7 = s5;
    }
}

// Board configurations ##########################################################################################################################
function corrnerS1(){
    X = s1;
    eC1 = s2;
    c1 = s3;
    eF1 = s6;
    cO = s9;
    eF2 = s8;
    c2 = s7;
    eC2 = s4;
    console.log("Board Set to corrner s1");
    console.log("");
    console.log("  X  | eC1 | c1            (s1) | s2  | s3 ");
    console.log("----------------          ----------------");
    console.log(" eC2 | s5  | eF1           s4  | s5  | s6 ");
    console.log("----------------          ----------------");
    console.log(" c2  | eF2 | cO            s7  | s8  | s9 ");
    console.log("");
}

function corrnerS3(){
    X = s3;
    eC1 = s6;
    c1 = s9;
    eF1 = s8;
    cO = s7;
    eF2 = s4;
    c2 = s1;
    eC2 = s2;
    console.log("Board Set to corrner s3");
    console.log("");
    console.log(" c2  | eC2 | X             s1  | s2  |(s3)");
    console.log("----------------          ----------------");
    console.log(" eF2 | s5  | eC1           s4  | s5  | s6 ");
    console.log("----------------          ----------------");
    console.log(" cO  | eF1 | c1            s7  | s8  | s9 ");
    console.log("");
}

function corrnerS9(){
    X = s9;
    eC1 = s8;
    c1 = s7;
    eF1 = s4;
    cO = s1;
    eF2 = s2;
    c2 = s3;
    eC2 = s6;
    console.log("Board Set to corrner s9");
    console.log("");
    console.log(" cO  | eF2 | c2            s1  | s2  | s3 ");
    console.log("----------------          ----------------");
    console.log(" eF1 | s5  | eC2           s4  | s5  | s6 ");
    console.log("----------------          ----------------");
    console.log(" c1  | eC1 |  X            s7  | s8  |(s9)");
    console.log("");
}

function corrnerS7(){
    X = s7;
    eC1 = s4;
    c1 = s1;
    eF1 = s2;
    cO = s3;
    eF2 = s6;
    c2 = s9;
    eC2 = s8;
    X = s7;
    console.log("Board Set to corrner s7");
    console.log("");
    console.log(" c1  | eF1 | cO            s1  | s2  | s3 ");
    console.log("----------------          ----------------");
    console.log(" eC1 | s5  | eF2           s4  | s5  | s6 ");
    console.log("----------------          ----------------");
    console.log("  X  | eC2 | c2           (s7) | s8  | s9 ");
    console.log("");
}


// Sets the isGameover variable to true and ends the game #######################################################################################
var gameNumber = 1;
function gameOver(){
    isGameover = true;
    console.log("Game over");
    gameNumber = gameNumber + 1;
}


