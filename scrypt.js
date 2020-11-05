// variables to connect javascript with html file (index.html)
var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 100;
var alert = document.getElementById("alert");
var info = document.getElementById("info");
var addscore = document.getElementById("addscore");
var submitresult = document.getElementById("submitresult");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));

// Questions -> Choices -> Answer
var questions = [
    {
        title: "What is the capital of USA?",
        choices: ["London", "Washington DC", "New York", "Paris"],
        answer: "Washington DC"
    },
    {
        title: "What is the biggest(surface wise) country in the world?",
        choices: ["Russia", "USA", "Brasil", "China"],
        answer: "Russia"
    },
    {
        title: "What is the most populated country per sq.?",
        choices: ["India", "South Korea", "China", "Monaco"],
        answer: "Monaco"
    },
    {
        title: "What is the smallest country in the world?",
        choices: ["Malta", "Venezuela", "Vatican", "Andora"],
        answer: "Vatican"
    },
    {
        title: "What is the highest currency in the world?",
        choices: ["British Pound", "EURO", "Dollar", "Kuwaiti Dinar"],
        answer: "Kuwaiti Dinar"
    },
]
// Start button -> Start Question ->
btnStart.addEventListener("click", starQuiz);
function starQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questions[currentindex]

    console.log(nextQuestions.title)

    displayQuestion(nextQuestions)
    gametime()
}
btnScore.addEventListener("click", function () {
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

// Start time
function gametime() {
    var timeinterval = setInterval(function () {
        timer.innerText = count
        count--;
        if (0 < count) {

        } else {
            count = 0
            endgame()
        }
    }, 1000);

}

// Score -> Local storage (push to high-score.html file)
function scorePage(a, b) {
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);
    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "high-score.html";
}

// Question -> Answer -> (push to next question)
function displayQuestion(question) {
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}

// Next question
function displaynextQuestion(e) {
    currentindex++
    if (currentindex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex]
            displayQuestion(nextQuestions)
        } else {
            currentindex = 0
            displayQuestion(nextQuestions)
        }
    } else {
        console.log("endgame")
        endgame()
    }
}
// Display one alert (for every choice i make)
function correction(response) {
    if (response) {
        alert.innerText = "Correct"

        console.log("Correct")
    } else {
        alert.innerText = "Incorrect"
        count = count - 10
        timer.innerHTML = count

        console.log("Incorrect")
    }
    setTimeout(function () {
        alert.innerText = ""

    }, 1000);

}
// Count the score (add the score)
function endgame() {
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


}
