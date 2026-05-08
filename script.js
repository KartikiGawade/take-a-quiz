const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const QuestioncontainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffeledQuestions, currentQueIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQueIndex++
    setNextQue()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffeledQuestions = questions.sort(() => Math.random() - .5)
    currentQueIndex = 0
    QuestioncontainerElement.classList.remove('hide')
    setNextQue()

}

function setNextQue() {
    resetState()
    showQue(shuffeledQuestions[currentQueIndex])
}

function showQue(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
    button.dataset.correct = answer.correct
 }

        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffeledQuestions.length > currentQueIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct === 'true') {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
    question: 'What is 2+2?',
    answers: [
        {text: '4', correct: true},
        {text: '22', correct: false}
    ]

    },
    {
        question: 'What is 3*3?',
        answers: [
            {text: '6', correct: false},
            {text: '9', correct: true}
        ]
    
    },
    {
        question: 'What is 10/2?',
        answers: [
            {text: '5', correct: true},
            {text: '2', correct: false}
        ]
    
    }
    
]