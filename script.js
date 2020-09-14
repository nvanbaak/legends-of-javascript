// Declare global variables
var startPage = document.getElementById("startPage");
var timeLimit = 75;

// When the document loads, we unhide the start page
document.body.onload = startPage.classList.toggle("hideMe");

// Start button functionality
document.getElementById("startBtn").addEventListener("click", function() {

    // Hide the start page
    startPage.classList.toggle("hideMe");

    // Make timer and quizPage visible
    document.getElementById("timer").classList.toggle("hideMe");
    document.getElementById("quizPage").classList.toggle("hideMe");

    // Start the timer
    var timer = setInterval(function() {

        // While there's still time on the clock
        if ( timeLimit > 0 ) {
        
            // Decrease the clock and update the display
            timeLimit--;
            updateTimeDisplay(timeLimit);

        } else {

            // Otherwise stop the clock and turn the timer red
            clearInterval(timer);
            document.getElementById("timer").style.color = "red";

            // Then move to Game Over page
            document.getElementById("quizPage").classList.toggle("hideMe");
            document.getElementById("endPage").classList.toggle("hideMe");
        }
    }, 1000);

});

function updateTimeDisplay(timeValue) {
    // This function takes a time value in seconds and outputs it to the timer display
    
    // get the seconds value using modulo 60
    var timeSeconds = timeValue % 60;
    // get the minutes value by subtracting the seconds and dividing by 60
    var timeMinutes = Math.floor( (timeValue - timeSeconds) / 60 )

    // if the seconds value is under 10 we need to add another 0 or it looks weird
    if ( timeSeconds < 10 ) {
        timeSeconds = "0" + timeSeconds;
    } 

    // Output the values
    document.getElementById("timerOutput").innerText = (timeMinutes + ":" + timeSeconds);

}


function displayQuestion(ques) {
    // This function takes a question object and dynamically constructs it on the page
}

// Question objects have a prompt and an array of four answers.  The corrent answer is always first in the array.
var question1 = {
    prompt:"Do you oppose the robotic overlords?",
    answers:["No","Of course","With my life!","I'm not sure"]
}
