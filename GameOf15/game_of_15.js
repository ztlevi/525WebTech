var $ = function(id) {
    return document.getElementById(id);
};

// set paramaters
// pick one item in the array to be empty
var numOfEmptyItem = Math.floor(Math.random() * 16);
var numOfMoves = 0;
var d = new Date();
var startTime = d.getTime();

function generateRandomTable() {
    var array = new Array();
    for (var i = 0; i < 15; ++i) {
        array[i] = i + 1;
    }

    for (var i = 0; i < 16; ++i) {
        if (i == numOfEmptyItem) {
            $("cell" + i).firstChild.nodeValue = null;
        } else {
            // select a number of an array and delete it from the array
            var numOfArray = Math.floor(Math.random() * (15 - i));

            $("cell" + i).firstChild.nodeValue = array[numOfArray];
            array.splice(numOfArray, 1);
        }
    }
}

var generateSimpleGame = function() {
    for (var i = 0; i < 15; ++i) {
        $("cell" + i).firstChild.nodeValue = i + 1;
    }
    $("cell" + 15).firstChild.nodeValue = null;
    numOfEmptyItem = 15;
    if (Math.random < 0.5) {
        $("cell" + numOfEmptyItem).firstChild.nodeValue =
            $("cell" + 14).firstChild.nodeValue;
        $("cell" + 14).firstChild.nodeValue = null;
        numOfEmptyItem = 14;
    } else {
        $("cell" + numOfEmptyItem).firstChild.nodeValue =
            $("cell" + 11).firstChild.nodeValue;
        $("cell" + 11).firstChild.nodeValue = null;
        numOfEmptyItem = 11;
    }
};

function swapToEmptyItem(numOfArray) {
    // click one item near the empty item, and swap it to the empty item
    if ((numOfArray - 1) == numOfEmptyItem || (numOfArray + 1) == numOfEmptyItem ||
        (numOfArray - 4) == numOfEmptyItem || (numOfArray + 4) == numOfEmptyItem) {
        $("cell" + numOfEmptyItem).firstChild.nodeValue =
            $("cell" + numOfArray).firstChild.nodeValue;
        $("cell" + numOfArray).firstChild.nodeValue = " ";
        numOfEmptyItem = numOfArray;

        // calculate the Moves
        numOfMoves++;
        $("currentMoves").innerHTML = "Current Moves: " + numOfMoves + "<br>";

        // calculate the used time
        var d = new Date();
        var used_time = d.getTime() - startTime;
        var used_time = new Date(used_time);
        $("usedTime").innerHTML = "Used Time: " + used_time.getMinutes() + "min " + used_time.getSeconds() + "s <br>";

        // if game clear, then prumpt the confirm window and ask user if he
        // wants to play again.
        if (endOfGame()) {
            if (confirm("Game clear! Do you want to play again?")) {
                start();
            } else {
                window.close();
            }
        }
    }
};

var endOfGame = function() {
    for (var i = 0; i < 15; ++i) {
        if ($("cell" + i).firstChild.nodeValue != (i + 1)) {
            return 0;
            break;
        }
    }
    return 1;
};

var start = function() {
    // set paramaters
    // pick one item in the array to be empty
    numOfEmptyItem = Math.floor(Math.random() * 16);
    numOfMoves = 0;
    var d = new Date();
    startTime = d.getTime();
    $("currentMoves").innerHTML = "Current Moves: " + numOfMoves + "<br>";
    $("usedTime").innerHTML = "Used Time: " + "0min " + "0s <br>";

    // generate Table
    generateRandomTable();
    $("newGame").addEventListener("click", start);
    $("simpleGame").addEventListener("click", simple_game);
    for (var i = 0; i < 16; ++i) {
        // there needs an function to pass i to num
        // $("cell" + i).setAttribute("onclick", "swapToEmptyItem("+ i +")" );

        // Method 2
        $("cell" + i).addEventListener("click", (function(num) {
            return function() {
                swapToEmptyItem(num);
            };
        })(i));
    }
};

var simple_game = function() {
    // set paramaters
    // pick one item in the array to be empty
    numOfEmptyItem = Math.floor(Math.random() * 16);
    numOfMoves = 0;
    var d = new Date();
    startTime = d.getTime();
    $("currentMoves").innerHTML = "Current Moves: " + numOfMoves + "<br>";
    $("usedTime").innerHTML = "Used Time: " + "0min " + "0s <br>";

    // generate Table
    generateSimpleGame();
    $("newGame").addEventListener("click", start);
    $("simpleGame").addEventListener("click", simple_game);
    for (var i = 0; i < 16; ++i) {
        // there needs an function to pass i to num
        $("cell" + i).addEventListener("click", (function(num) {
            return function() {
                swapToEmptyItem(num);
            };
        })(i));
    }
};

window.addEventListener("load", start);
