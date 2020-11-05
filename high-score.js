// variables to connect javascript with html file (high-score.html)
var storedScores = JSON.parse(localStorage.getItem("userData"));
var highScoresArea = document.querySelector("#highScoresList");
var backBtn = document.querySelector("#playAgain");
var resetBtn = document.querySelector("#resetScores");

// Display the scores in a ordered list 
function displayScores() {
    if (storedScores !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScoresArea.appendChild(scoreList);
    }
};

// Display the scores
displayScores();

// Button to go back and play again
backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

// Button to reset all the scores (to clear)
resetBtn.addEventListener("click", function () {
    highScoresArea.innerHTML = "";
    window.localStorage.clear();

});
