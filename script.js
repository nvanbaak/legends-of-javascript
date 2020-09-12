// Declare global variables
var startPage = document.getElementById("startPage");
var timeLimit = 75;

// When the document loads, we unhide the start page
document.body.onload = startPage.classList.toggle("hideMe");

// DStart button functionality
document.getElementById("startBtn").addEventListener("click", function() {

    // Hides the start page
    startPage.classList.toggle("hideMe");

    // Makes timer visible
    document.getElementById("timer").classList.toggle("hideMe");

    // Start the timer
    var timer = setInterval(function() {

        // While there's still time on the clock
        if ( timeLimit > 0 ) {
        
            // Decrease the clock
            timeLimit--;
            console.log(timeLimit);

        } else {

            // Otherwise stop the clock and move to Game Over
            clearInterval(timer);
        }
    }, 1000);
    
});





