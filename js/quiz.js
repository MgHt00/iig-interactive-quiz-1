let totalNumOfQuestion = 5; // Set the total num of questions to show in the quiz.
const headerContainer = document.querySelector("#header");
const questionContainer = document.querySelector("#question");
const answersContainer = document.querySelector("#section-answers");
const paginationContainer = document.querySelector("#section-pagination");
const messageContainer = document.querySelector("#message");
const nextButton = document.querySelector("#next-btn");
let currentQuestionIndex; // Index to match the question and the answers.
let currentQuestionNo = 1; // For paginations and to contol the number of questions to be shown.
let questions = []; // Data will be fetch from JSON
let shuffledQuestions = []; // To copy the questions array to manipulate without touching the original question array.

const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];

const answerClassList = ["ans-a", "ans-b", "ans-c", "ans-d"];
const alphabetImg = ["assets/a.png", "assets/b.png", "assets/c.png", "assets/d.png"];
const alphabetAlt = ["a", "b", "c", "d"];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuestion() {
  // Simulate disabling the button after 0.3 seconds 
  // and add `disabled` class
  setTimeout(() => {
    nextButton.disabled = true;
    nextButton.classList.add("disabled");
  }, 300);
  // Clear previous answers
  answersContainer.innerHTML = '';

  // Generate a random question index
  currentQuestionIndex = random(0, (shuffledQuestions.length-1));

  // Display the question
  questionContainer.textContent = shuffledQuestions[currentQuestionIndex].question;

  // Copy `answers` array from `shuffledQuestions` to a temporary array
  let tempAnswersArray = [...shuffledQuestions[currentQuestionIndex].answers];

  // Display the answers
  /*for (let answer of tempAnswersArray) {
    const answerButton = document.createElement("button");
    answerButton.setAttribute("class", "answer-btn");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", handleAnswerClick);
    answersContainer.append(answerButton);
  }
  
  for (let answer of tempAnswersArray) {
    const tempAnswerContainer = document.createElement("div");
      //tempAnswerContainer.setAttribute("class", "answer-container");
      tempAnswerContainer.classList.add("answer-container");
      tempAnswerContainer.classList.add("ans-a");

    const tempAnswerAlphabet = document.createElement("div");
    tempAnswerAlphabet.setAttribute("class", "answer-alphabet");

    const tempAnswerText = document.createElement("div");
    tempAnswerText.setAttribute("class", "answer-text");

    // JS: assign answer
    tempAnswerText.textContent = answer;

    // HTML: add two divs 'answer-alphabet' and 'answer-text' to 'answer-container'
    tempAnswerContainer.append(tempAnswerAlphabet);
    tempAnswerContainer.append(tempAnswerText);

    tempAnswerContainer.addEventListener("click", handleAnswerClick);

    // HTML: add 'answer-container' to 'section-answers'
    answersContainer.append(tempAnswerContainer);
  }*/

  tempAnswersArray.forEach((answer, index) => {
    // Refer this HTML structure
    // <div class="answer-container ans-a">
    //    <div class="answer-alphabet"><img src="assets/a.png" alt="A"></div>
    //    <div class="answer-text">aaaaa</div>
    //  </div>
    const tempAnswerContainer = document.createElement("div");
    tempAnswerContainer.classList.add("answer-container", answerClassList[index]);

    const tempAnswerAlphabet = document.createElement("div");
    tempAnswerAlphabet.setAttribute("class", "answer-alphabet");

    const tempAlphabetImg =  document.createElement("img");
    tempAlphabetImg.src = alphabetImg[index];
    tempAlphabetImg.alt = alphabetAlt[index];

    const tempAnswerText = document.createElement("div");
    tempAnswerText.setAttribute("class", "answer-text");

    // JS: assign answer
    tempAnswerText.textContent =  answer;

    // HTML: add '<img>' to 'answer-alphabet'
    tempAnswerAlphabet.append(tempAlphabetImg);

    // HTML: add two divs 'answer-alphabet' and 'answer-text' to 'answer-container'
    tempAnswerContainer.append(tempAnswerAlphabet);
    tempAnswerContainer.append(tempAnswerText);

    tempAnswerContainer.addEventListener("click", handleAnswerClick);

    // HTML: add 'answer-container' to 'section-answers'
    answersContainer.append(tempAnswerContainer);
  });
}

function DisplayPagination() {
    // Clear previous pagination (if needed)
    paginationContainer.innerHTML = '';
    // Display pagination
    for (let i = 1; i <= totalNumOfQuestion; i++) {
      const pagination = document.createElement("div");
      pagination.setAttribute("class", "pagination");
      // Add 'active' class to show where we are right now with the pagination
      if (i === currentQuestionNo) {
        pagination.classList.add("active");
      }
      paginationContainer.append(pagination);
    }
    currentQuestionNo++;
}

function handleAnswerClick(event) {
  const selectedAnswer = event.target.textContent;

  // Assign currently showing question and answer set to a temp object.
  const currentQuestionSet = shuffledQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestionSet.correctAnswer) {
    // Adds the `correct` class to the button that was clicked
    event.target.classList.add("correct");

    // Disable all buttons
    const allButtons = document.querySelectorAll(".answer-btn");
    for (let button of allButtons) {
      button.disabled = true;
    }
    
    // Simulate re-enabling the button after 0.3 seconds
    setTimeout(() => {
        nextButton.disabled = false;
        nextButton.classList.remove("disabled");
    }, 300);
    
    nextButton.addEventListener("click", nextButtonClick);
    // Show random correct message drawn from `correctMessages` array
    messageContainer.textContent = correctMessages[random(0, correctMessages.length-1)];
  } else {
    // Adds the `incorrect` class to the button that was clicked
    event.target.classList.add("incorrect");
    messageContainer.textContent = wrongMessages[random(0, wrongMessages.length-1)];
  }
}

function nextButtonClick(event) {
  // spliceQuestion() is called, if there is still a question left in `shuffledQuestions`
    if ((currentQuestionNo <= totalNumOfQuestion) && (shuffledQuestions.length !== 0)) {
      spliceQuestion();
    } else {
      finishSession();
    }
    DisplayPagination();
}


function spliceQuestion() {
  // Delete shown questions from `shuffleQuestions` array
  shuffledQuestions.splice(currentQuestionIndex, 1);

  // randomQestion() is called again, if there is still a question left after the splice()
  shuffledQuestions.length === 0 ? finishSession() : randomQuestion();
}

function finishSession() {
  // Clear header, previous question, answers, and pagination; then show the complete message
  headerContainer.remove();
  questionContainer.remove();
  answersContainer.remove();
  paginationContainer.remove();
  
  messageContainer.textContent = "Well done! You've completed all the questions.";

  // Remove Next button from display
  if (nextButton) {
    nextButton.remove();
  }
}

// Fetch questions from JSON file
fetch('assets/data/questions.json')
//  The fetch function returns a promise that resolves to the response object 
//  representing the HTTP response.
  .then(response => response.json())
  //  The first .then method takes the response object returned by the fetch request  
  //  and converts it to JSON using the json() method. This method also returns a promise 
  //  that resolves to the JSON object.
  .then(data => {
    // The second .then method takes the JSON object (now stored in the data variable) 
    // and assigns it to the questions variable.
    questions = data;
    // Copy questions array to shuffledQuestions
    shuffledQuestions = [...questions]; 
    // Calls initial functions
    randomQuestion();
    DisplayPagination();
  })
  .catch(error => console.error('Error loading questions:', error));

// Disable `nextButton` at the start
nextButton.disabled = true;