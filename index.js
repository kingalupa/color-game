var level = 1;
var points = 0;
var gameColors = [];
var numberofButtons = 2;
var userClickedColor = [];
var userClickedBox = [];
var userClickedPattern = [];
var randomPositionsOfBlocks = [];
var started = false;

// Detrcting Keyboard Press
$(document).keydown(function(){
    if (!started) {
        $("h1").text("level " + level);
        $(".points p").text("Points:" + points);

        // $(".container").css("display", "grid");
        playGame();
        started = true;
        // $("body").load("index.html");
      

       
    }
}) 
// 


   
function startOver() {
    level = 1;
    points = 0;
    gameColors = [];
    userClickedColor = [];
    userClickedBox = [];
    userClickedPattern = [];
    gameColors = [];
    started = false;

}

function playGame() {
    nextLevel();
    var twoMinutes = 60 * 2;
    display = document.querySelector('#time');
    $(".time p").text("Time left:");
    startTimer(twoMinutes, display);
    
    }  
        
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    
    var x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    if (started === false) {
        clearInterval(x);
    }
    if (--timer < 0) {
            clearInterval(x);
            $("#time").css("color", "white");
            $(".time").css("color", "white");
            playSoundGameOver("./sounds/game_over.mp3");
            $("h1").text("Game Over. Press any key to restart.");
            $(".btn").remove();
            startOver()
    }}, 1000);

}

// Generate blocks of random colors in random position

function nextLevel(){
    numberofButtons = (4*level) + 2;
    randomPosition();
    for (i=2; i <= 2*level +2; i++) {
        var randomNumber1 = Math.floor(Math.random()*256);
        var randomNumber2 = Math.floor(Math.random()*256);
        var randomNumber3 = Math.floor(Math.random()*256);
        if (randomNumber1 == 116 && randomNumber2 == 64) {
            randomNumber3 !== 164
        }
        var randomColor = "rgb(" + randomNumber1 + "," + randomNumber2 + "," +  randomNumber3 + ")";
        var newX = "no_" + (i-2);
        var newY = "no_" + ((i-2)+(numberofButtons/2));

        if (gameColors.indexOf(randomColor) === -1) {
            var newRandomColor = randomColor;
            gameColors.push(newRandomColor);
            }
        addButton("row", newX,newRandomColor, numberofButtons);
        addButton("row", newY,newRandomColor, numberofButtons);

        for (k = 0; k < numberofButtons; k++) {
            $("#no_" + k).css("order", randomPositionsOfBlocks[k]);
        }


    }
    if (gameColors.length > 2) {
        addColumns("row");
        }
    }





function randomPosition() {
    for(l = 0; l < numberofButtons; l++) {
        while (randomPositionsOfBlocks.length < numberofButtons) {
            var number = Math.floor(Math.random()*numberofButtons);
            if (randomPositionsOfBlocks.indexOf(number) === -1){
                var newNumber = number;
                randomPositionsOfBlocks.push(newNumber);
            }
        }
        
    }
}


// Add new button in random positions
function addButton(line, newID, color) {
    var new_div = document.createElement("button");
    new_div.classList.add("btn", color);
    new_div.id = newID;
    new_div.style.backgroundColor = color;
    if (level < 2) {
        new_div.style.height = 200/level + "px";
        new_div.style.width = 200/level + "px";
    }
    else if (level < 5) {
        new_div.style.height = 300/level + "px";
        new_div.style.width = 300/level + "px";
    }
    else if (level < 9) {
        new_div.style.height = 400/level + "px";
        new_div.style.width = 400/level + "px";
    }
    else if (level >= 9) {
        new_div.style.height = 500/level + "px";
        new_div.style.width = 500/level + "px";
    }
    $(new_div).click(function() {
        var userChosenBox = this.getAttribute("id");
        var userChosenColor = this.style.getPropertyValue("background-color");
        userClickedColor.push(userChosenColor);
        userClickedBox.push(userChosenBox);
        $(new_div).addClass("choice");
        checkAnswer();
        playSound("./sounds/beep.mp3", userChosenBox);
        animatePress(userChosenBox);    
    });
    $("." + line).append(new_div);
    }
   



function checkAnswer() {
    for (g = 0; g < userClickedColor.length; g++){
        if(userClickedColor[g] === userClickedColor[g+1] && userClickedBox[g] !== userClickedBox[g+1]) {
            $(".choice").css("border", "none");
            $(".choice").css("background-color", "rgb(116, 64, 164)");
            userClickedPattern.push(userClickedColor[g]);
            points = points + level;
            $(".points p").text("Points:" + points);
            userClickedColor = [];
            userClickedBox = [];
            
        }
        if (userClickedColor.length >= 2) {
            userClickedColor = [];
            userClickedBox = [];
            $(".btn").removeClass("choice");
        }

        if (userClickedPattern.length === gameColors.length){
                started = false;
                $("body").load("index.html");
                $("h1").text("Level" + " " + level + " "+ "completed. Press any key")
                $(".btn").remove();
                userClickedColor = [];
                userClickedBox = [];
                userClickedPattern = [];
                gameColors = [];
                level++;
            
                

        }

    }
    }


function addColumns(container){
        $("." + container).css("display", "grid");
        var times = level+2;
        // var gap = level*10;
        $("." + container).css("grid-template-columns", "repeat(" +times+ ", 1fr)");
        $("." + container).css("align-content", "flex-start");
        $("." + container).css("align-items", "flex-start");
        $("." + container).css("gap", "20px");
       
}



function playSound(name, currentColor) { 
    if ($("#" + currentColor).css("background-color") !== "rgb(116, 64, 164)"){
    var audio = new Audio(name);
    audio.play();
    }
}

function playSoundGameOver(name) {
    var audio = new Audio(name);
    audio.play();

}


function animatePress(currentColor) {
    if ($("#" + currentColor).css("background-color") !== "rgb(116, 64, 164)") {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 200)

    }
}
