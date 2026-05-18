const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "In which year did India gain independence?",
        options: ["1942", "1947", "1950", "1962"],
        answer: "1947"
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        answer: "Au"
    },
    {
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Africa", "Australia", "South America"],
        answer: "Africa"
    },
    {
        question: "Who is known as the Father of Computers?",
        options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
        answer: "Charles Babbage"
    },
    {
        question: "Which organ in the human body purifies blood?",
        options: ["Heart", "Liver", "Kidney", "Lungs"],
        answer: "Kidney"
    },
    {
        question: "What is the national sport of India?",
        options: ["Cricket", "Hockey", "Kabaddi", "Football"],
        answer: "Hockey"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
        answer: "Hydrogen"
    },
    {
        question: "Which festival is known as the Festival of Lights in India?",
        options: ["Holi", "Diwali", "Navratri", "Eid"],
        answer: "Diwali"
    },
    {
        question: "Which device is used to measure temperature?",
        options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
        answer: "Thermometer"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
const TOTAL_TIME = 20;
let timer;
let userName = "";

document.getElementById("start-btn").addEventListener("click", () => {
    userName = document.getElementById("username").value.trim();
    if (userName === "") {
        alert("Please enter your name before starting!");
        return;
    }
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("quiz-screen").classList.remove("hide");
    document.getElementById("end-btn").style.display = "inline-block";
    document.querySelector(".progress-bar").style.display = "block";
    startQuiz();
});

document.getElementById("end-btn").addEventListener("click", () => {
    stopTimer();
    endQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question").textContent = q.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option-btn");
        btn.dataset.correct = (opt === q.answer);
        btn.onclick = () => {
            stopTimer();
            btn.classList.add(btn.dataset.correct === "true" ? "correct" : "wrong");
            if (btn.dataset.correct === "true") score++;
            setTimeout(nextQuestion, 1000);
        };
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeLeft = TOTAL_TIME;
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimer() {
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    const progress = document.getElementById("progress");
    progress.style.width = `${(timeLeft / TOTAL_TIME) * 100}%`;
}

function endQuiz() {
    document.getElementById("question").textContent = "Quiz Finished!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("progress").style.width = "0%";
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;

    // High Score with localStorage
    let highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        highScore = score;
    }
    document.getElementById("highscore").textContent = `High Score: ${highScore}`;

    document.getElementById("end-btn").style.display = "none";
    document.querySelector(".progress-bar").style.display = "none";
    document.getElementById("restart-btn").classList.remove("hide");
}

document.getElementById("restart-btn").addEventListener("click", () => {
    document.getElementById("restart-btn").classList.add("hide");
    document.getElementById("end-btn").style.display = "inline-block";
    document.querySelector(".progress-bar").style.display = "";
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("quiz-screen").classList.remove("hide");
    startQuiz();
});

