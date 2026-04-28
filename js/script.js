const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const timer = document.getElementById("timer");
const questionCount = document.getElementById("questionCount");

const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const clickSound = new Audio("assets/sounds/click.mp3");

let current = 0;
let score = 0;
let time = 15;
let interval;
let answered = false;

// LOAD QUESTION
function loadQuestion() {

    clearInterval(interval);
    answered = false;

    let q = questions[current];

    question.innerText = q.question;

    questionCount.innerText =
        `Question ${current + 1} of ${questions.length}`;

    options.innerHTML = "";
    result.innerHTML = "";

    q.options.forEach(option => {

        let btn = document.createElement("button");

        btn.innerText = option;

        btn.classList.add("option");

        btn.onclick = () =>
            selectAnswer(btn, option, q.answer);

        options.appendChild(btn);
    });

    progress.style.width =
        `${((current + 1) / questions.length) * 100}%`;

    startTimer();
}

// SELECT ANSWER
function selectAnswer(btn, selected, correct) {

    if (answered) return;

    answered = true;

    clearInterval(interval);

    Array.from(options.children).forEach(button => {

        button.disabled = true;

        if (button.innerText === correct) {
            button.classList.add("correct");
        }
    });

    if (selected === correct) {

        correctSound.play();

        score++;

    } else {

        wrongSound.play();

        btn.classList.add("wrong");
    }
}

// TIMER
function startTimer() {

    time = 15;

    timer.innerText = time;

    interval = setInterval(() => {

        time--;

        timer.innerText = time;

        if (time === 0) {

            clearInterval(interval);

            nextQuestion();
        }

    }, 1000);
}

// NEXT QUESTION
function nextQuestion() {

    clickSound.play();

    current++;

    if (current < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
}

// SHOW RESULT
function showResult() {

    // SAVE BASIC DATA
    localStorage.setItem("lastScore", score);

    localStorage.setItem("totalQuiz", questions.length);

    localStorage.setItem("lastGame", "General Quiz");

    // BADGE SYSTEM
    let badge = "Beginner 🐣";

    if (score >= 5) {

        badge = "Expert 🏆";

    } else if (score >= 3) {

        badge = "Intermediate 🚀";
    }

    localStorage.setItem("badge", badge);

    // ACTIVITY HISTORY
    let history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    history.push({
        quiz: "General Quiz",
        score: `${score}/${questions.length}`,
        date: new Date().toLocaleDateString()
    });

    // KEEP ONLY LAST 5
    if (history.length > 5) {
        history.shift();
    }

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );

    // DAILY STREAK SYSTEM
    const today = new Date().toLocaleDateString();

    let streak =
        parseInt(localStorage.getItem("streak")) || 0;

    let lastPlayedDate =
        localStorage.getItem("lastPlayedDate");

    if (lastPlayedDate !== today) {

        const yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        const yesterdayDate =
            yesterday.toLocaleDateString();

        if (lastPlayedDate === yesterdayDate) {

            streak++;

        } else {

            streak = 1;
        }

        localStorage.setItem("streak", streak);

        localStorage.setItem("lastPlayedDate", today);
    }

    // UI UPDATE
    question.innerText = "Quiz Completed 🎉";

    options.innerHTML = "";

    nextBtn.style.display = "none";

    timer.style.display = "none";

    questionCount.style.display = "none";

    result.innerHTML = `
        <h2>Quiz Completed 🎉</h2>
        <p>Your Score: ${score}/${questions.length}</p>
    `;
}

// NEXT BUTTON
nextBtn.onclick = nextQuestion;

// START QUIZ
loadQuestion();