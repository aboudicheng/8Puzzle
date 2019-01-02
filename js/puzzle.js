var puzzle = [[], [], []];
var x = 0, y = 0; //1's current position
var coord;

//Initialize the puzzle with values starting from 1 to 9
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        puzzle[i][j] = i * 3 + j + 1;
    }
}

var choice; //from select option combo box

function Puzzle() {
    $('select').change(function () {
        $('#select > .start-btn').off('click');
        choice = this.selectedIndex;
        if (choice !== 0) {
            $('#select > .start-btn').fadeIn(300, function () {
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

                    var speed = path.length === 30 ? 100 : 1000;

                    animateShuffle(path, 0, speed);
                })
            });
        }
        else {
            $('#select > .start-btn').hide();
        }
    })
}

/**
 * 
 * @param {The direction to move} command 
 * @param {Speed for animate function} speed 
 * @param {Callback after animate finishes} callback 
 */
function traverse(command, speed, callback) {
    switch (command) {
        case "right":
            $(`.p${puzzle[x][y + 1]}`).animate({ right: "+=152px" }, speed, function () {
                callback();
            });
            break;
        case "left":
            $(`.p${puzzle[x][y - 1]}`).animate({ right: "-=152px" }, speed, function () {
                callback();
            });
            break;
        case "up":
            $(`.p${puzzle[x - 1][y]}`).animate({ top: "+=152px" }, speed, function () {
                callback();
            });
            break;
        case "down":
            $(`.p${puzzle[x + 1][y]}`).animate({ top: "-=152px" }, speed, function () {
                callback();
            });
            break;
        default: return;
    }

    coord = shift(command, x, y);
    x = coord.tileX;
    y = coord.tileY;
}

/**
 * 
 * @param {The direction to move} command 
 * @param {Speed for animate function} speed 
 * @param {Callback after animate finishes} callback 
 */
function backtrack(command, speed, callback) {
    $('.puz').css({ opacity: 0.4, cursor: 'default' })
    var backCommand;
    switch (command) {
        case "right":
            $(`.p${puzzle[x][y - 1]}`).animate({ right: "-=152px" }, speed, function () {
                callback();
            });
            backCommand = "left";
            break;
        case "left":
            $(`.p${puzzle[x][y + 1]}`).animate({ right: "+=152px" }, speed, function () {
                callback();
            });
            backCommand = "right";
            break;
        case "up":
            $(`.p${puzzle[x + 1][y]}`).animate({ top: "-=152px" }, speed, function () {
                callback();
            });
            backCommand = "down";
            break;
        case "down":
            $(`.p${puzzle[x - 1][y]}`).animate({ top: "+=152px" }, speed, function () {
                callback();
            });
            backCommand = "up";
            break;
        default: return;
    }


    coord = shift(backCommand, x, y);
    x = coord.tileX;
    y = coord.tileY;
}

function end() {
    $('#puzzle').off('mouseenter mouseleave');
    $('#solve-puzzle').hide();
    $('#congrats').show().delay(200).fadeOut(200).fadeIn(200).animate({ fontSize: '+=20px', bottom: '250px' }).animate({ bottom: '-=50px' }).animate({ bottom: '+=50px' });
    $('#restart').fadeIn(300).delay(700).animate({ fontSize: '+=35px' }).animate({ fontSize: '-=35px' })
}

//function that backtracks according to the path
function solve(path) {
    if (path.length > 0) {
        backtrack(path.pop(), 100, function () {
            solve(path);
        })
    }
    else {
        end();
    }
}

//Shuffling animation
function animateShuffle(path, i, speed) {
    if (i < path.length) {
        traverse(path[i], speed, function () {
            animateShuffle(path, ++i, speed);
        })
    }
    else { //when shuffling finishes
        //If user presses ESC
        $(window).on('keydown', function (e) {
            if (e.which === 27) {
                solve(path);
            }
        })
        $('#solve-puzzle').show().animate({ fontSize: '+=15px' }, 800);
        $('.puz').css({ opacity: 1.0, cursor: 'default' })
        $('#puzzle').hover(
            function () {
                play(path);
            },
            function () {
                if (!check()) {
                    $('.puz').css('opacity', 1).off();
                }
                else {
                    $('.puz').css({ opacity: 0.4, cursor: 'default' });
                }
            }
        )
    }
}

function play(path) {
    $('.puz').off();
    $('.puz').css({ opacity: 0.4, cursor: 'default' });
    if (!check()) {
        var movables = checkMovables();
        movables.forEach(tile => {
            $(`.p${puzzle[tile.x][tile.y]}`).css({ opacity: 1.0, cursor: 'pointer' }).click(function () {
                traverse(tile.command, 500, function () {
                    play(path);
                })
                path.push(tile.command);
            })
        })
    }
    else {
        end();
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

// returns the current possible movements
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

function shift(command, tileX, tileY) {
    var temp;
    if (command === "up") {
        temp = puzzle[tileX - 1][tileY];
        puzzle[tileX - 1][tileY] = puzzle[tileX][tileY];
        puzzle[tileX][tileY] = temp;
        tileX = tileX - 1;
    }
    else if (command === "down") {
        temp = puzzle[tileX + 1][tileY];
        puzzle[tileX + 1][tileY] = puzzle[tileX][tileY];
        puzzle[tileX][tileY] = temp;
        tileX = tileX + 1;
    }
    else if (command === "left") {
        temp = puzzle[tileX][tileY - 1];
        puzzle[tileX][tileY - 1] = puzzle[tileX][tileY];
        puzzle[tileX][tileY] = temp;
        tileY = tileY - 1;
    }
    else {
        temp = puzzle[tileX][tileY + 1];
        puzzle[tileX][tileY + 1] = puzzle[tileX][tileY];
        puzzle[tileX][tileY] = temp;
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
        coord = shift(commands[ran], x, y);
        x = coord.tileX;
        y = coord.tileY;
    }

    return path;
}