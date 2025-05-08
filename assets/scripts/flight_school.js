let currentQuestionIndex = 0;
let totalQuestions = 0;
let questions = [];

// Function to load the CSV file and parse it
async function loadQuestions(csvFilePath) {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n').map(row => row.split('#'));

    // Skip the header row by slicing the array from the second row
    return rows.slice(1).map(([question, correct, wrong1, wrong2, wrong3]) => ({
        question,
        correct,
        answers: [correct, wrong1, wrong2, wrong3]
    }));
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateQuestionTracker() {
    const trackerContainer = document.querySelector('.flight_school__question-tracker');
    trackerContainer.innerHTML = '';

    for (let i = 0; i < totalQuestions; i++) {
        const trackerItem = document.createElement('div');
        trackerItem.className = 'flight_school__question-tracker-item';
        trackerItem.textContent = i + 1;

        trackerItem.addEventListener('click', () => {
            currentQuestionIndex = i;
            displayQuestion(questions[currentQuestionIndex]);
        });

        trackerContainer.appendChild(trackerItem);
    }
}

function updateQuestionTracker() {
    const trackerItems = document.querySelectorAll('.flight_school__question-tracker-item');

    trackerItems.forEach((item, index) => {
        if (index === currentQuestionIndex) {
            item.classList.add('current');
            item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        } else {
            item.classList.remove('current'); // Remove highlight from others
        }
    });
}

function updateTrackerItem(index, isCorrect) {
    const trackerItems = document.querySelectorAll('.flight_school__question-tracker-item');
    const trackerItem = trackerItems[index];

    if (isCorrect) {
        trackerItem.classList.add('correct');
    } else {
        trackerItem.classList.add('incorrect');
    }
}

function displayQuestion(questionData) {
    const questionElement = document.querySelector('.flight_school__question');
    const buttons = document.querySelectorAll('.flight_school__button');

    questionElement.textContent = questionData.question;

    const shuffledAnswers = [...questionData.answers];
    shuffleArray(shuffledAnswers);

    buttons.forEach((button, index) => {
        button.textContent = shuffledAnswers[index];
        button.className = 'flight_school__button'; // Reset button styles
        button.onclick = () => handleAnswer(button, shuffledAnswers[index], questionData.correct);
    });

    updateQuestionTracker();
}

function handleAnswer(button, selectedAnswer, correctAnswer) {
    const buttons = document.querySelectorAll('.flight_school__button');
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect'); 

        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Disable all buttons after selection
    buttons.forEach(btn => btn.onclick = null);
    updateTrackerItem(currentQuestionIndex, isCorrect);
    saveAnswerToLocalStorage(currentQuestionIndex, isCorrect);
}

function saveAnswerToLocalStorage(index, isCorrect) {
    const storedAnswers = JSON.parse(localStorage.getItem('flightSchoolAnswers')) || {};
    storedAnswers[index] = isCorrect;
    localStorage.setItem('flightSchoolAnswers', JSON.stringify(storedAnswers));
}

function loadAnswersFromLocalStorage() {
    // Retrieve stored answers from local storage
    const storedAnswers = JSON.parse(localStorage.getItem('flightSchoolAnswers')) || {};

    // Update the question tracker based on stored answers
    Object.keys(storedAnswers).forEach(index => {
        const isCorrect = storedAnswers[index];
        updateTrackerItem(parseInt(index), isCorrect);
    });
}

async function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }

    displayQuestion(questions[currentQuestionIndex]);
}

async function loadRandomQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }

    displayQuestion(questions[currentQuestionIndex]);
}



async function initQuiz() {
    questions = await loadQuestions('/assets/data/flight_school_questions.csv'); // Path to your CSV file
    totalQuestions = questions.length;

    generateQuestionTracker();
    loadAnswersFromLocalStorage();
    displayQuestion(questions[currentQuestionIndex]);
}


document.addEventListener('DOMContentLoaded', initQuiz);