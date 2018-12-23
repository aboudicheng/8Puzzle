var puzzle = [[], [], []];
var x = 0, y = 0; //1's current position

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        puzzle[i][j] = i * 3 + j + 1;
    }
}

var choice;

function Puzzle() {
    $('select').change(function () {
        choice = this.selectedIndex;
        if (choice !== 0) {
            $('#select > .start-btn').fadeIn('slow', function () {
                // Start shuffling
                $(this).click(function () {
                    $('#select').fadeOut('slow');
                    var path;
                    if (choice === 1) {
                        path = shuffle(3);
                    }
                    else {
                        path = shuffle(30);
                    }
                    console.log(path)
                })
            });
        }
        else {
            $('#select > .start-btn').hide();
        }
    })
}

function rand(length) {
    return Math.floor(Math.random() * length);
}

function shift(command) {
    var temp;
    if (command === "up") {
        temp = puzzle[x - 1][y];
        puzzle[x - 1][y] = puzzle[x][y];
        puzzle[x][y] = temp;
        x = x - 1;
    }
    else if (command === "down") {
        temp = puzzle[x + 1][y];
        puzzle[x + 1][y] = puzzle[x][y];
        puzzle[x][y] = temp;
        x = x + 1;
    }
    else if (command === "left") {
        temp = puzzle[x][y - 1];
        puzzle[x][y - 1] = puzzle[x][y];
        puzzle[x][y] = temp;
        y = y - 1;
    }
    else {
        temp = puzzle[x][y + 1];
        puzzle[x][y + 1] = puzzle[x][y];
        puzzle[x][y] = temp;
        y = y + 1;
    }
}

//Returns an array with commands (right, left, up, down)
function shuffle(amount) {
    var path = [];
    for (var i = 0; i < amount; i++) {
        var prev;
        if (path.length > 0) {
            prev = path[path.length - 1];
        }
        var commands = []
        //Push all possible paths
        if (!prev) {
           prev ="nothing" ;
        }

        if (x + 1 <= 2 && prev !== "up") {
                commands.push("down")
        }
        if (x - 1 >= 0 && prev !== "down") {
                commands.push("up")
        }
        if (y - 1 >= 0 && prev !== "right") {
                commands.push("left")
        }
        if (y + 1 <= 2 && prev !== "left") {
                commands.push("right")
        }

        var ran = rand(commands.length);

        //randomly choose the path according to available choices
        path.push(commands[ran])

        //Shift the elements
        shift(commands[ran]);
        console.log(puzzle)
    }

    return path;
}