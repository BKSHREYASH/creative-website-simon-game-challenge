let buttonColors = ["red","blue","green","yellow"]

let gamePattern = []

let userClickedPattern = []

let started = false

let level = 0;

function startOver() {
  level = 0
  gamePattern = []
  started = false
}

$(document).on("keypress", function () {

  if(!started) {

    $("#level-title").text("Level "+level)
    nextSequence()
    started = true


  }

});

$(".btn").on("click",function () {
  let userChosenColour = $(this).attr("id")
  console.log(userChosenColour)
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)

})

function nextSequence() {

  userClickedPattern = []

  level++

  $("#level-title").text("Level "+level)

  let randomNumber = Math.floor(Math.random() * 4)

  let randomChosenColour = buttonColors[randomNumber]
  gamePattern.push(randomChosenColour)

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

  playSound(randomChosenColour)
  // let audio = new Audio("sounds/"+gamePattern+".mp3")
  // audio.play()
}

function playSound(name) {
  let audio = new Audio("sounds/"+name+".mp3")
  audio.play()
}

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed")

    setTimeout(function() {
      $("#"+currentColor).removeClass("pressed")
    },100)

}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success")

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence()
      },1000)
    }

  } else {

    playSound("wrong")
    // let audio = new Audio("sounds/wrong.mp3")
    // audio.play()

    $("body").addClass("game-over")

    setTimeout(function() {
      $("body").removeClass("game-over")
    },200)

    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver()
    //console.log("wrong")

  }
}
