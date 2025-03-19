const questions = [
    {
        question: "Grass is green. Sky is blue. You are:",
        options: ["black", "yellow", "red"],
        correct: "yellow"
    },
    {
        question: "I gave you 10 bucks. You should give back to me:",
        options: ["10k", "10", "100"],
        correct: "10k"
    },
    {
        question: "Am I the most beautiful flower in the world?",
        options: ["Yes", "No"],
        correct: "Yes",
        disableNo: true
    }
];

const followUpQuestions = [
    {
        question: "Đăng già anh có muốn tiếp tục không?",
        options: ["Yes", "No"]
    },
    {
        question: "Thế nào người đẹp?",
        options: ["Yes", "No"]
    },
    {
        question: "Chịu thua chưa?",
        options: ["Yes", "No"]
    }
];

let currentQuestionIndex = 0;
let currentFollowUpIndex = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", selectAnswer);
        if (currentQuestion.disableNo && option === "No") {
            button.disabled = true;
        }
        optionsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            currentFollowUpIndex = 0;
            showFollowUpQuestion(currentFollowUpIndex);
        }
    } else {
        alert("Ahihi đồ ngốc chơi lại đi");
        currentQuestionIndex = 0;
        loadQuestion();
    }
}

function showFollowUpQuestion(index) {
    if (index < followUpQuestions.length) {
        const followUp = followUpQuestions[index];
        questionElement.innerText = followUp.question;
        optionsElement.innerHTML = "";

        followUp.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", handleFollowUpAnswer);
            optionsElement.appendChild(button);
        });
    } else {
        showFinalQuestion();
    }
}

function handleFollowUpAnswer(e) {
    const answer = e.target.innerText;
    if (answer === "Yes") {
        currentFollowUpIndex++;
        showFollowUpQuestion(currentFollowUpIndex);
    } else {
        alert("Ahihi đồ ngốc chơi lại đi");
        currentFollowUpIndex = 0;
        showFollowUpQuestion(currentFollowUpIndex);
    }
}

function showFinalQuestion() {
    questionElement.innerText = "Em có đẹp không?";
    optionsElement.innerHTML = "";

    const yesButton = document.createElement("button");
    yesButton.innerText = "Yes";
    yesButton.addEventListener("click", () => {
        document.body.innerHTML = "<h1>🌸 Ahihi lêu lêu</h1>";
    });
    optionsElement.appendChild(yesButton);

    const noButton = document.createElement("button");
    noButton.innerText = "No";
    noButton.disabled = true; // Disable No button
    optionsElement.appendChild(noButton);
}

nextButton.addEventListener("click", loadQuestion);
loadQuestion();