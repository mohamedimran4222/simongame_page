var buttonColours = ["red", "blue", "green", "white"];

var game = [];
var UserClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#leveltitle").text("Level" + level);
    nextsequence();
    started = true;
  }
});
$(".btn").click(function () {
  var UserChosenColor = $(this).attr("id");
  UserClickPattern.push(UserChosenColor);
  playsound(UserChosenColor);
  animatepress(UserChosenColor);
  checkAnswer(UserClickPattern.length - 1);
});
function checkAnswer(currentlevel) {
  if (game[currentlevel] === UserClickPattern[currentlevel]) {
    if (UserClickPattern.length === game.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("gameover");
    $("#leveltitle").text("Game Over,Press any key to restart");
    setTimeout(function () {
      $("body").removeClass("gameover");
    }, 200);
    startover();
  }
}
function nextsequence() {
  UserClickPattern = [];
  level++;
  $("#leveltitle").text("Level" + level);
  var RandomNumber = Math.floor(Math.random() * 4);
  var RandomChosenColor = buttonColours[RandomNumber];
  game.push(RandomChosenColor);
  $("#" + RandomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(RandomChosenColor);
}
function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function playsound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

function startover() {
  level = 0;
  game = [];
  started = false;
}
