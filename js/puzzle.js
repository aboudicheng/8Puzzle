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

                    for (var i = 0; i < 3; i++) {
                        for (var j = 0; j < 3; j++) {
                            puzzle[i][j] = i * 3 + j + 1;
                        }
                    }

                    x = 0, y = 0;

                    console.log(path)

                    animate(path, 0);
                })
            });
        }
        else {
            $('#select > .start-btn').hide();
        }
    })
}

function animate(path, i) {
    if (i < path.length) {
        if (path[i] === "right") {
            $(`.p${puzzle[x][y + 1]}`).animate({ right: "+=152px"}, 1000, function() {
                animate(path, ++i);
            })
        }
        else if (path[i] === "left") {
            $(`.p${puzzle[x][y - 1]}`).animate({ right: "-=152px"}, 1000, function() {
                animate(path, ++i);
            })
        }
        else if (path[i] === "up") {
            $(`.p${puzzle[x - 1][y]}`).animate({ top: "+=152px"}, 1000, function() {
                animate(path, ++i);
            })
        }
        else {
            $(`.p${puzzle[x + 1][y]}`).animate({ top: "-=152px"}, 1000, function() {
                animate(path, ++i);
            })
        }

        coord = shift(puzzle, path[i], x, y);
        x = coord.tileX;
        y = coord.tileY;
    }
    else {

    }
}

function rand(length) {
    return Math.floor(Math.random() * length);
}

function shift(puz, command, tileX, tileY) {
    var temp;
    if (command === "up") {
        temp = puz[tileX - 1][tileY];
        puz[tileX - 1][tileY] = puz[tileX][tileY];
        puz[tileX][tileY] = temp;
        tileX = tileX - 1;
    }
    else if (command === "down") {
        temp = puz[tileX + 1][tileY];
        puz[tileX + 1][tileY] = puz[tileX][tileY];
        puz[tileX][tileY] = temp;
        tileX = tileX + 1;
    }
    else if (command === "left") {
        temp = puz[tileX][tileY - 1];
        puz[tileX][tileY - 1] = puz[tileX][tileY];
        puz[tileX][tileY] = temp;
        tileY = tileY - 1;
    }
    else {
        temp = puz[tileX][tileY + 1];
        puz[tileX][tileY + 1] = puz[tileX][tileY];
        puz[tileX][tileY] = temp;
        tileY = tileY + 1;
    }

    return {tileX, tileY}
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
        var coord = shift(puzzle, commands[ran], x, y);
        x = coord.tileX;
        y = coord.tileY;
    }

    return path;
}