// ============================
//            SETUP
// ============================

// Declare global variables; many of these will be assigned in the newGame() function
const startPage = document.getElementById("startPage");
const quizPage = document.getElementById("quizPage");
const endPage = document.getElementById("endPage");
var timeLimit;
var playerScore;
var numCorrect;
var gameOver;
var qCount;
var qArray;
var sessionHighScores;

newGame();

// Set the start page as visible on start
startPage.classList.toggle("hideMe");

// Type out splash quote
pretendITypedThis("In the grim darkness of the far future, your knowledge of basic web development trivia is all that stands between the human race... and oblivion.", document.getElementById("startQuote"));

// ===============================
//           FUNCTIONS
// ===============================

function newGame() {
    // TimeLimit starts equal to playerScore
    timeLimit = playerScore = 120;

    // The player has answered no questions and has gotten none correct
    qCount = 0;
    numCorrect = 0;

    // Obviously the game's not over
    gameOver = false;

    // We create and randomize an array of questions
    // Question objects have a prompt and an array of four answers.  The correct answer is always first in the array.
    qArray = randomizeArray([
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

    // Finally we grab the values of any stored high scores
    scoreTable = localStorage.getItem("highScores");

    // If there are no stored scores, we make an empty score list
    if (scoreTable === null) {
        // make scoreTable an array
        scoreTable = [];
        // Add some score objects
        for (i = 10; i > 0 ; i--) {
            scoreTable.push( {
                name:("QuizBot #" + i),
                score:i * 50
            } );
        }
    } else {
        // If there are stored scores, we just use those
        scoreTable = JSON.parse(scoreTable);
    }

    // Use scoreTable as the basis for our dynamic high score list
    sessionHighScores = scoreTable;

    // Populate the high score display
    populateHighScores();
}

function populateHighScores() {

    // Clear the list

    // Grab anything with class "score-row"
    var oldRows = document.getElementsByClassName("score-row");

    // Keep killing the first element until we run out
    while (oldRows.length > 0) {
        oldRows[0].remove();
    }

    // Append updated scores

    // For each high score
    sessionHighScores.forEach( function(thisguy) {

        // Make a row div
        var scoreRow = document.createElement("div");
        scoreRow.setAttribute('class','row score-row');

        // Put the high scorer's name and score in a paragraph
        var scoreP = document.createElement("p");
        scoreP.innerText = thisguy.name + ": " + thisguy.score;

        // Append up the chain to the high score list
        scoreRow.appendChild(scoreP);
        document.getElementById("scoreModalTable").appendChild(scoreRow);
    })
}

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

        // get a reference to alert bar
        var alert = document.getElementById("submitAlert");

        // If the high score input isn't empty
        if ( document.getElementById("highScore").value != "") {

            // Store playerScore in localStorage with provided name
            localStorage.setItem(
                document.getElementById("highScore").value,
                playerScore
                );
                
                // Turn off the button so they can't just keep resubmitting 
                document.getElementById("submitBtn").classList.toggle("btn-success");
                document.getElementById("submitBtn").classList.toggle("btn-disabled");
                document.getElementById("submitBtn").disabled = true;

                // Hide the alert banner
                alert.style.display = "none";
        } else {

            // If it is empty, warn the user
            alert.style.display = "block";
        }
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
        
        // Technically you could drive the clock negative by pushing timeLimit past -60, but the game will end before you can get that far
    }

    // Output the values
    document.getElementById("timerOutput").innerText = (timeMinutes + ":" + timeSeconds);

    // We also update the score display
    updateScore();
}

function updateScore() {
    // Calculate score; we bound the time variable at a minimum of 1 so you'll at least get credit for correct answers 
    playerScore = numCorrect * Math.max(1, timeLimit);

    // Update score display
    document.getElementById("scoreOutput").innerText = playerScore;
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

                // Give the player credit for correct answer, then update their score
                numCorrect++;
                updateScore();
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
        document.getElementById("score").innerText = playerScore;
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








