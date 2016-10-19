var $ = function(id) {
    return document.getElementById(id);
};

// pick one item in the array to be empty
var numOfEmptyItem = Math.floor(Math.random() * 16);

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

function swapToEmptyItem(numOfArray) {
    // click one item near the empty item, and swap it to the empty item
    if ((numOfArray - 1) == numOfEmptyItem || (numOfArray + 1) == numOfEmptyItem ||
        (numOfArray - 4) == numOfEmptyItem || (numOfArray + 4) == numOfEmptyItem) {
        $("cell" + numOfEmptyItem).firstChild.nodeValue =
            $("cell" + numOfArray).firstChild.nodeValue;
        $("cell" + numOfArray).firstChild.nodeValue = null;
        numOfEmptyItem = numOfArray;
    }
};

var start = function() {
    generateRandomTable();
    for (var i = 0; i < 16; ++i) {
        // there needs an function to pass i to num, so that it can be used
        (function(num) {
            $("cell" + i).addEventListener("click", function() {
                swapToEmptyItem(num);
            })
        })(i);
    }
};
window.addEventListener("load", start);
