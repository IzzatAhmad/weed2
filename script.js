const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<b>"],
        correctAnswer: "<br>"
    },
    {
        question: "Which tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        correctAnswer: "<ul>"
    },
    {
        question: "Which attribute is used to provide a title for the document?",
        options: ["title", "meta", "name", "description"],
        correctAnswer: "title"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let timerInterval;

const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const timerElement = document.getElementById("timer");
const feedbackText = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const scoreDisplay = document.getElementById("score");
const nextSection = document.getElementById("next-section");
const timerSection = document.getElementById("timer-section");
const feedbackSection = document.getElementById("feedback-section");

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            feedbackText.textContent = "Time's up!";
            nextSection.style.display = "block";
        }
    }, 1000);
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerOptions.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => checkAnswer(option));
        answerOptions.appendChild(button);
    });
    
    nextSection.style.display = "none";
    feedbackText.textContent = "";
    feedbackSection.style.display = "none";  // Hide feedback section initially
    startTimer();
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    feedbackSection.style.display = "block";  // Show feedback section
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        feedbackText.textContent = `Correct! Well done.`;
        feedbackText.style.color = "green";  // Green color for correct
    } else {
        feedbackText.textContent = `Incorrect! The correct answer was "${currentQuestion.correctAnswer}".`;
        feedbackText.style.color = "red";  // Red color for incorrect
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextSection.style.display = "block";
    clearInterval(timerInterval);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionText.textContent = "Quiz Over!";
    answerOptions.innerHTML = '';
    feedbackText.textContent = `Your final score is ${score} out of ${questions.length}`;
    nextSection.style.display = "none";
    timerSection.style.display = "none";
    startButton.textContent = "Reset Quiz";
    feedbackSection.style.display = "block"; // Show feedback at the end
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    nextSection.style.display = "none";
    timerSection.style.display = "block";
    startButton.textContent = "Reset Quiz";  // Change text to "Reset Quiz"
    displayQuestion();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    nextSection.style.display = "none";
    timerSection.style.display = "block";
    feedbackSection.style.display = "none";  // Hide feedback section on reset
    startButton.textContent = "Start Quiz";  // Change text back to "Start Quiz"
    displayQuestion();
}

startButton.addEventListener("click", function () {
    if (startButton.textContent === "Start Quiz") {
        startQuiz();
    } else {
        resetQuiz();
    }
});

nextButton.addEventListener("click", nextQuestion);
