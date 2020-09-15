// Declare global variables
var startPage = document.getElementById("startPage");
var quizPage = document.getElementById("quizPage");
var timeLimit = 75;
var gameOver = false;



// Question objects have a prompt and an array of four answers.  The corrent answer is always first in the array.
var question1 = {
    prompt:"Do you oppose the robotic overlords?",
    answers:["No","Of course","With my life!","I'm not sure"]
}

// Eventually we'll just unhide the start page, but while
// I'm working on the quizpage we're unhiding that instead
// // startPage.classList.toggle("hideMe");
quizPage.classList.toggle("hideMe");
document.getElementById("timer").classList.toggle("hideMe");
displayQuestion(question1);





// Start button functionality
document.getElementById("startBtn").addEventListener("click", function() {

    // Hide the start page
    startPage.classList.toggle("hideMe");

    // Make timer and quizPage visible
    document.getElementById("timer").classList.toggle("hideMe");
    quiPage.classList.toggle("hideMe");

    // Start the timer
    var timer = setInterval(function() {

        // While the game is running and there's still time on the clock
        if ( !gameOver && timeLimit > 0 ) {
        
            // Decrease the clock and update the display
            timeLimit--;
            updateTimeDisplay(timeLimit);

        } else {

            // Otherwise stop the clock and turn the timer red
            clearInterval(timer);
            document.getElementById("timer").style.color = "red";

            // Then move to Game Over page
            quizPage.classList.toggle("hideMe");
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
    if ( timeSeconds < 10 && timeSeconds >= 0) {
        timeSeconds = "0" + timeSeconds;
    } else if ( timeSeconds < 0) {
        // We don't let the clock run negative
        timeSeconds = "00";
    }

    // Output the values
    document.getElementById("timerOutput").innerText = (timeMinutes + ":" + timeSeconds);
}


function randomizeArray(inputArray) {

    // Make a new empty array of length equal to inputArray
    var newArray = [];
    for (i = 0; i < inputArray.length; i++) {
        newArray.push("");
    }
    
    // Iterate through old array, putting each element a random location in the new array
    for ( i = 0; i < inputArray.length; i++) {
        // Start with a random index
        var newIndex = Math.floor(Math.random() * newArray.length);

        // Check if the array slot at that index is occupied
        if (newArray[newIndex] != "") {

        // If so, loop until we find an empty slot
            while (newArray[newIndex] != "") {

                // Increase the index
                newIndex++;

                // If we exceed the array, start over at the beginning
                if (newIndex >= newArray.length) {
                    newIndex = 0;
                }
            }
        }

        // Now that newIndex points to an empty slot, drop the item there
        newArray[newIndex] = inputArray[i];
    }

    return newArray;
}












function displayQuestion(ques) {
    // This function takes a question object and dynamically constructs it on the page

    // First step is to generate the title
    var titlerow = document.createElement("div");
    titlerow.setAttribute('class', 'row');
    var titlecol = document.createElement("div");
    titlecol.setAttribute('class', 'col');
    var titleP = document.createElement("p");
    titleP.innerText = ques.prompt;

    // Append to quizPage
    titlecol.appendChild(titleP);
    titlerow.appendChild(titlecol);
    quizPage.appendChild(titlerow);

    // Then we generate row/column for the answers
    var ansrow = document.createElement("div");
    ansrow.setAttribute('class', 'row');
    var anscol = document.createElement("div");
    anscol.setAttribute('class', 'answerList d-flex flex-column');

    // Create a paragraph element for each answer and append
    for (i = 0; i < 4; i++) {
        var ansEl = document.createElement("p");
        if (i === 0) {
            ansEl.setAttribute("class", "answer correct");
        } else {
            ansEl.setAttribute("class", "answer");
        }
        ansEl.innerText = ques.answers[i];
        anscol.appendChild(ansEl);
    }

    // Finally we append the answers to the page
    ansrow.appendChild(anscol);
    quizPage.appendChild(ansrow);

    // Now that the page is set up, we add behavior

    // Background animates based on answer clicked
    document.querySelector(".answerList").addEventListener("click", function(event) {
        event.stopPropagation();

        var quizFrame = document.querySelector(".container");

        // We ignore everything that isn't one of our answers
        if (event.target.matches("p")) {

            // Set transition speed to 0 so the background changes instantly
            quizFrame.style = "transition: background-color 0ms";

            // The correct answer turns the background green; otherwise red
            if ( event.target.classList.value.indexOf("correct") > -1 ) {
                quizFrame.style.backgroundColor = "#51ff00dd";
            } else {
                quizFrame.style.backgroundColor = "#ff0000dd";

                // Incorrect answers also penalize the timer, so we do that here
                timeLimit -= 10;
                updateTimeDisplay(timeLimit);
            }

            // Once we have the new background color, slowly transition back
            setTimeout(function () {
                quizFrame.style = "transition: background-color 500ms";
                quizFrame.style.backgroundColor = "#f5f5f5dd";
            }, 100);        
        }
    });


}











