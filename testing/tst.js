const leftButton = document.getElementById('leftButton');
const rightInputs = document.getElementById('rightInputs');
const subjectInput = document.getElementById('subjectInput');
const questionInput = document.getElementById('questionInput');
const questionList = document.getElementById('questionList');
const rightDisplay = document.getElementById('rightDisplay');
const questionDisplay = document.getElementById('questionDisplay');
const responseInputs = document.getElementById('responseInputs');
const responseList = document.getElementById('responseList');
let selectedQuestionBox = null;
let selectedQuestionId = null;


window.onload = function() {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    savedQuestions.forEach(question => {
        addQuestionToLeftContainer(question.subject, question.question, question.id);
    });
}

leftButton.addEventListener('click', () => {
    rightInputs.classList.toggle('hidden');
    rightDisplay.classList('hidden');
});

document.getElementById('submitQuestion').addEventListener('click', () => {
    const subject = subjectInput.value;
    const question = questionInput.value;

    if (subject && question) {
        const id = new Date();
        addQuestionToLeftContainer(subject, question, id);

       
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        savedQuestions.push({ subject, question, id });
        localStorage.setItem('questions', JSON.stringify(savedQuestions));

        subjectInput.value = '';
        questionInput.value = '';
        rightInputs.classList.add('hidden');
    }
});

function addQuestionToLeftContainer(subject, question, id) {
    const questionBox = document.createElement('div');
    questionBox.className = 'questionBox';
    questionBox.dataset.id = id;
    questionBox.innerText = `Subject: ${subject} Question: ${question}`;
    questionList.appendChild(questionBox);
}

questionList.addEventListener('click', (event) => {
    if (event.target.classList.contains('questionBox')) {
        const id = event.target.dataset.id;
        selectedQuestionBox = event.target;
        selectedQuestionId = id;
        rightInputs.classList.add('hidden');
        questionDisplay.innerText = selectedQuestionBox.innerText;
        rightDisplay.classList.remove('hidden');
        responseInputs.classList.remove('hidden');

      
        const savedResponses = JSON.parse(localStorage.getItem('responses')) || {};
        const responsesForQuestion = savedResponses[id] || [];
        responseList.innerHTML = '';
        responsesForQuestion.forEach(response => {
            addResponseToResponseList(response.name, response.response);
        });
    }
});

document.getElementById('deleteQuestion').addEventListener('click', () => {
    if (selectedQuestionBox) {
        const id = selectedQuestionBox.dataset.id;

       
        let savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        savedQuestions = savedQuestions.filter(q => q.id !== id);
        localStorage.setItem('questions', JSON.stringify(savedQuestions));

        
        let savedResponses = JSON.parse(localStorage.getItem('responses')) || {};
        delete savedResponses[id];
        localStorage.setItem('responses', JSON.stringify(savedResponses));

        
        selectedQuestionBox.remove();
        rightDisplay.classList.add('hidden');
        responseList.innerHTML = '';  
    }
});

document.getElementById('submitResponse').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    const response = document.getElementById('responseInput').value;

    if (name && response && selectedQuestionId) {
        addResponseToResponseList(name, response);

        
        const savedResponses = JSON.parse(localStorage.getItem('responses')) || {};
        const responsesForQuestion = savedResponses[selectedQuestionId] || [];
        responsesForQuestion.push({ name, response });
        savedResponses[selectedQuestionId] = responsesForQuestion;
        localStorage.setItem('responses', JSON.stringify(savedResponses));

        
        document.getElementById('nameInput').value = '';
        document.getElementById('responseInput').value = '';
    }
});

function addResponseToResponseList(name, response) {
    const responseBox = document.createElement('div');
    responseBox.className = 'responseBox';
    responseBox.innerText = `Name: ${name}   Response: ${response} ` ;
    responseList.appendChild(responseBox);

   
}