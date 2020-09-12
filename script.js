
// When the document loads, we unhide the start page

var startPage = document.getElementById("startPage");
document.body.onload = startPage.classList.toggle("hideMe");

// Determines start button behavior
document.getElementById("startBtn").addEventListener("click", function() {

    // Hides the start page
    startPage.classList.toggle("hideMe")

})