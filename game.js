// const gamepattern = new Array();

const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$("#start").click(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);

  animatepress(userChosenColour);
  
  checkanswer(userClickedPattern.length-1);

  //   console.log(userClickedPattern);
  //console.log(userClickedPattern);
});


function checkanswer(currentlevel){

    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
         //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }


    }
    else{
        playsound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
       $("#level-title").text("Game-over , press start to restart");
          startover();
    }
}


function nextSequence() {
    userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomchoosencolor = buttonColours[randomNumber];

  gamePattern.push(randomchoosencolor);

  $("#" + randomchoosencolor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomchoosencolor);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}


function startover(){
    level = 0;
    gamePattern = [];
    started =false;

}