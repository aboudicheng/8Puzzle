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
                    var speed = path.length === 30 ? 100 : 1000;

                    animate(path, 0, speed);
                })
            });
        }
        else {
            $('#select > .start-btn').hide();
        }
    })
}

function animate(path, i, speed) {
    if (i < path.length) {
        if (path[i] === "right") {
            $(`.p${puzzle[x][y + 1]}`).animate({ right: "+=152px" }, speed, function () {
                animate(path, ++i, speed);
            })
        }
        else if (path[i] === "left") {
            $(`.p${puzzle[x][y - 1]}`).animate({ right: "-=152px" }, speed, function () {
                animate(path, ++i, speed);
            })
        }
        else if (path[i] === "up") {
            $(`.p${puzzle[x - 1][y]}`).animate({ top: "+=152px" }, speed, function () {
                animate(path, ++i, speed);
            })
        }
        else {
            $(`.p${puzzle[x + 1][y]}`).animate({ top: "-=152px" }, speed, function () {
                animate(path, ++i, speed);
            })
        }

        coord = shift(puzzle, path[i], x, y);
        x = coord.tileX;
        y = coord.tileY;
    }
    else {
        $('#solve-puzzle').show().animate({ fontSize: '+=15px' }, 800);
        $('#puzzle').hover(
            function () {
                if (!check()) {
                    $('.puz').css('opacity', 0.4);
                    var movables = checkMovables();
                    console.log(movables)
                    movables.forEach(tile => {
                        $(`.p${puzzle[tile.x][tile.y]}`).css({ opacity: 1.0, cursor: 'pointer' }).click(function () {
                            switch (tile.command) {
                                case "down":
                                    $(this).animate({ top: "-=152px" }, 1000);
                                    break;
                                case "up":
                                    $(this).animate({ top: "+=152px" }, 1000);
                                    break;
                                case "right":
                                    $(this).animate({ right: "+=152px" }, 1000);
                                    break;
                                case "left":
                                    $(this).animate({ right: "-=152px" }, 1000);
                                    break;
                                default: return;
                            }
                            path.push(tile.command);
                            x = tile.x;
                            y = tile.y;
                        })
                    })
                }
                else {
                    console.log("congrats")
                }
            },
            function () {
                $('.puz').css('opacity', 1);
            }
        )
    }
}

function check() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (puzzle[i][j] !== (i * 3 + j + 1)) {
                return false;
            }
        }
    }

    return true;
}

function checkMovables() {
    var commands = [];
    if (x + 1 <= 2) {
        commands.push({ x: x + 1, y, command: "down" })
    }
    if (x - 1 >= 0) {
        commands.push({ x: x - 1, y, command: "up" })
    }
    if (y - 1 >= 0) {
        commands.push({ x, y: y - 1, command: "left" })
    }
    if (y + 1 <= 2) {
        commands.push({ x, y: y + 1, command: "right" })
    }

    return commands;
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

    return { tileX, tileY }
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
            prev = "nothing";
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