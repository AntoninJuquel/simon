var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var statment = 0;


//when you start the game
$(document).on("keydown", function myFunction(event) {
  if (event.key === "a") {
    nextSequence();
    $(document).off("keydown");
    game();
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  if (checkAnswer(statment)) {
    statment++;
    if (statment === gamePattern.length) {
      userClickedPattern = [];
      statment = 0;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  }
});

function game(){
  $(document).on("keydown",function play(event){
    switch(event.key){
      case "7" : $(".green").click();
      break;
      case "9" : $(".red").click();
      break;
      case "1" : $(".yellow").click();
      break;
      case "3" : $(".blue").click();
    }
  });
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  statment = 0;
  $(document).off("keydown");
  $(document).on("keydown", function myFunction() {
      nextSequence();
      $(document).off("keydown");
      game();
  });
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[currentLevel]) {
    console.log("good");
    return true;
  } else {
    console.log("bad");
    return false;
  }

}

//to add the next color
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var color = ["red", "green", "blue", "yellow"];
  var randomChosenColour = color[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  var id = "#" + gamePattern[gamePattern.length - 1];
  $(id).fadeOut(10).fadeIn(10);
  playSound(gamePattern[gamePattern.length - 1]);
}

function playSound(name) {
  var mp3File = "sounds/" + name + ".mp3";
  var audio = new Audio(mp3File);
  audio.play();
}

function animatePress(currentColor) {
  var id = "#" + currentColor;
  setTimeout(
    function() {
      $(id).toggleClass("pressed");
    }, 100);
  $(id).toggleClass("pressed");
}
