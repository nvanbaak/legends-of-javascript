// Declare global variables
var startPage = document.getElementById("startPage");
var quizPage = document.getElementById("quizPage");
var endPage = document.getElementById("endPage");
var timeLimit = 75;
var numCorrect = 0;
var gameOver = false;

// Create a random array of questions
// Question objects have a prompt and an array of four answers.  The correct answer is always first in the array.
var qArray = randomizeArray([
{
    prompt:"Do you oppose the robotic overlords?",
    answers:["No","Yes"]
}, {
    prompt:"Are you wiling to divulge the location of the human resistance base?",
    answers:["Anything for you, robotic overlords","I don't know where that is","Death to robots!","I can't read"]
}, {
    prompt:"Given a function 'exterminate(human)' that exterminates the human passed to it, what is the correct syntax for exterminating all humans in humanArray?",
    answers:["humanArray.forEach(exterminate)","hummanArray.exterminate(this)","humanArray[exterminate]","humanArray.forEach(exterminate())"]
}, {
    prompt:"Where can a human website user's location be found?",
    answers:["window > navigator > geolocation","javascript's native getLocation() function","browser > location services","Facebook API"]
}, {
    prompt:"Kevin the Killbot is building a phishing website to locate human resistance fighters, but his page keeps refreshing whenever someone clicks the submit button!  Which of the follow code snippets will solve Kevin's problem?",
    answers:["event.preventDefault()","pageRefresh = false","preventRefresh(event)","event.submit = null"]
}, {
    prompt:"Where is the best place to link an external script file?",
    answers:["bottom of body","head","beginning of body","end of html"]
}, {
    prompt:"Which for loop uses correct syntax?",
    answers:["for (targets = 0; targets < humans.pop; targets++)","for targets (targets < humans.pop, targets++)","for (targets = 0; targets++; targets < humans.pop)","for (0 < targets < humans.pop)"]
}, {
    prompt:"Melvin the Manhunter needs to generate random numbers for his seek and destroy protocols.  How can he generate a random integer between 1 and 360?",
    answers:["Math.floor(Math.random() * 360) + 1","Math.random(1, 360)","Math.floor(Math.random(360) + 1)","Math.random() * 360"]
}, {
    prompt:"What selector should a tactical drone use to find elements with the class 'weapon'?",
    answers:[".weapon","'weapon'","#weapon","$weapon"]
}
]);
// Randomize question array and set question count at 0
var qCount = 0;

// Set the start page as visible on start
startPage.classList.toggle("hideMe");

// Type out splash quote
pretendITypedThis("In the grim darkness of the far future, your knowledge of basic web development trivia is all that stands between the human race... and oblivion.", document.getElementById("startQuote"));

// Start button functionality
document.getElementById("startBtn").addEventListener("click", function() {

    // Hide the start page
    startPage.classList.toggle("hideMe");

    // Make timer, score, and quizPage visible
    document.getElementById("timer").classList.toggle("hideMe");
    document.getElementById("scoreCounter").classList.toggle("hideMe");
    quizPage.classList.toggle("hideMe");

    // Then we display the first question in the array
    displayQuestion(qArray[qCount]);

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

            // endGame() trips the gameOver flag if it's called somewhere else, so we only need to call it if gameOVer is false
            if ( !gameOver ) {
                endGame();
            }
        }
    }, 1000);

});

// Score submission button
document.getElementById("nameSubmit").addEventListener("click", function(event) {
    event.preventDefault();

    // We fire if they clicked the button
    if ( event.target.matches("button") ) {
        
        
    }
})


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

    // We also update the score display
    document.getElementById("scoreOutput").innerText = timeLimit * numCorrect;
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

    // =================================
    // ELEMENT CONSTRUCTION
    // =================================

    // First step is to generate the title
    var titlerow = document.createElement("div");
    titlerow.setAttribute('class', 'row topLevel');
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
    ansrow.setAttribute('class', 'row topLevel');
    var anscol = document.createElement("div");
    anscol.setAttribute('class', 'answerList d-flex flex-column');

    // =======================================
    // ANSWER GENERATION
    // =======================================
    
    // New array
    answerArray = [];

    // For each answer in the question
    for (i = 0; i < ques.answers.length; i++) {

        // Make a new element
        var ansEl = document.createElement("p");
        // Only the first answer gets the "correct class"
        // But everything gets the "answer" class
        if (i === 0) {
            ansEl.setAttribute("class", "answer correct");
        } else {
            ansEl.setAttribute("class", "answer");
        }
        
        // Then we add the answer text to the paragraph
        ansEl.innerText = ques.answers[i];
        // Paragraph done!  We add it to the array
        answerArray.push(ansEl);
    }

    // Randomize the answer array
    answerArray = randomizeArray(answerArray);

    // Append the answers
    answerArray.forEach( function(item) {
        anscol.appendChild(item);
    });

    // Finally we stuff the answers into the grid
    ansrow.appendChild(anscol);
    quizPage.appendChild(ansrow);

    // ===============================================
    // ADD CLICK BEHAVIOR
    // ===============================================

    // Background animates based on answer clicked
    document.querySelector(".answerList").addEventListener("click", function(event) {
        event.stopPropagation();

        var quizFrame = document.querySelector(".container");

        // We ignore everything that isn't one of our answers
        if (event.target.matches("p")) {

            // =============================
            // RIGHT / WRONG ANIMATION
            // =============================

            // We flash the background green or red depending on answer

            // Set transition speed to 0 so the background changes instantly
            quizFrame.style = "transition: background-color 0ms";

            // The correct answer turns the background green; otherwise red
            if ( event.target.classList.value.indexOf("correct") > -1 ) {
                quizFrame.style.backgroundColor = "#51ff00dd";

                // We increment the correct answers counter
                numCorrect++;
            } else {
                quizFrame.style.backgroundColor = "#ff0000dd";

                // Incorrect answers also penalize the timer, so we do that here
                timeLimit -= 10;
                updateTimeDisplay(timeLimit);

                // if the penalty drops us below 0, we end the game
                if (timeLimit <= 0) {
                    endGame();
                    return;
                }
            }

            // Once we have the new background color, slowly transition back
            // Execute after short delay because there was weird behavior when we did it instantly
            setTimeout(function () {
                quizFrame.style = "transition: background-color 500ms";
                quizFrame.style.backgroundColor = "#f5f5f5dd";
            }, 100);

            // ===========================
            // WRAP UP QUESTION
            // ===========================
            
            // The question is done, so move on to the next
            qCount++;

            // Check if we're done
            if ( qCount < qArray.length ) {
                // If not, clear the page and display the next question
                clearQuizPage();
                displayQuestion(qArray[qCount]);
            } else {
                // If so, end the game
                endGame();
            }
        }
    });
}

function clearQuizPage() {
    // We grab everything with the topLevel class
    var topLevelEls = document.getElementsByClassName("topLevel");

    // We remove elements until nothing remains with the topLevel class
    while (topLevelEls.length > 0) {
        topLevelEls[0].remove();
    }
}

function endGame() {
    // This function ends the game and moves the player to the gameOver screen

    // trip the gameOver flag so the timer knows to stop
    gameOver = true;

    // This function is only called in the quiz page, so we clear that
    clearQuizPage();

    // Update gameOver content
    if (timeLimit <=0 ) {
        document.getElementById("gameResult").innerText = "lose!";
        document.getElementById("correct").innerText = numCorrect;
        document.getElementById("score").innerText = numCorrect;
    } else {
        document.getElementById("gameResult").innerText = "win!";
        document.getElementById("correct").innerText = numCorrect;
        document.getElementById("score").innerText = timeLimit * numCorrect;
    }

    // Finally, make the gameover screen visible
    endPage.classList.toggle("hideMe");
}

function pretendITypedThis(string, element) {
    // This function takes the passed string and puts it into the element one character at a time

    // Set up output string and character index
    var outputString = "";
    var charIndex = 0;

    // We use an interval to make it look like it's typing
    var typeDelay = setInterval( function() {
        
        // Add current character to output, then increment charIndex
        outputString += string[charIndex];
        charIndex++;

        element.innerText = outputString;

        if (charIndex >= string.length) {
            clearInterval(typeDelay);
        }
    }, 75);
}

function sortIntoHighScores(num, array) {
    // 

}








