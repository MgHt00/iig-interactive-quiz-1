/*function contentManager() {

}
*/
function randomQuestion() {
  console.groupCollapsed("randomQuestion()");

  setNodeDisabled({
    node: nextButton,
    isDisabled: true,
    changeItFast: true,
  });

  cleanNode({
    node: answersContainer,
    isDeepClean: true,
  }); // Clear previous answers

  // Generate a random question index
  currentQuestionIndex = random(0, (shuffledQuestions.length-1));

  // Display the question
  addTextContent({
    node: questionContainer,
    content: shuffledQuestions[currentQuestionIndex].question,
  });

  // Copy `answers` array from `shuffledQuestions` to a temporary array
  let tempAnswersArray = [...shuffledQuestions[currentQuestionIndex].answers];

  // Display the answers
  tempAnswersArray.forEach((answer, index) => {
    console.groupCollapsed("Building answer btn: ", index);
    buildAnswerBtn(answer, index);
    console.groupEnd();
  });

  console.groupEnd();
}

function buildAnswerBtn(answer, index) {
  console.groupCollapsed("buildAnswerBtn()");
  // Refer to this HTML structure
  // <div class="answer-container ans-a">
  //    <div class="answer-alphabet"><img src="assets/a.png" alt="A"></div>
  //    <div class="answer-text">aaaaa</div>
  //  </div>

  const tempAnswerContainer = buildNode({
                                element: "div", 
                                classNames: ["answer-container", answerClassList[index]],
                              });

  const tempAnswerAlphabet = buildNode({
                              element : "div",
                              classNames: ["answer-alphabet"],
                            });

  const tempAlphabetImg =  buildNode({
                            element : "img",
                          });

  tempAlphabetImg.src = alphabetImg[index];
  tempAlphabetImg.alt = alphabetAlt[index];
 
  const tempAnswerText = buildNode({
                          element : "div",
                          classNames : ["answer-text"],
                        });

  // JS: assign answer
  addTextContent({
    node: tempAnswerText,
    content: answer,
  });

  // HTML: add '<img>' to 'answer-alphabet'
  tempAnswerAlphabet.append(tempAlphabetImg);

  // HTML: add two divs 'answer-alphabet' and 'answer-text' to 'answer-container'
  tempAnswerContainer.append(tempAnswerAlphabet);
  tempAnswerContainer.append(tempAnswerText);

  tempAnswerContainer.addEventListener("click", handleAnswerClick);

  // HTML: add 'answer-container' to 'section-answers'
  answersContainer.append(tempAnswerContainer);
  console.groupEnd();

}

function fetchRandomMessage(status){
  console.groupCollapsed("fetchRandomMessage()");
  
  let messageArray;
  switch (status) {
    case 'correct':
      messageArray = correctMessages;
      console.info("Case:", status," | Array: ", messageArray);
      break;
    case 'incorrect':
      messageArray = wrongMessages;
      console.info("Case:", status," | Array: ", messageArray);
      break;
  }
  console.groupEnd();
  return messageArray[random(0, messageArray.length-1)];
}
/*
function controlManager() {

}
*/
function DisplayPagination() {
  console.groupCollapsed("DisplayPagination()");
    
    cleanNode({ // Clear previous pagination (if needed)
      node: paginationContainer,
      isDeepClean: true,
    }); 

    for (let i = 1; i <= totalNumOfQuestion; i++) { // Display pagination
      console.groupCollapsed("Building pagination: ", i);
      buildPagination(i); // calling sub-function
      console.groupEnd();
    }
    currentQuestionNo++;
    console.groupEnd();
    
    function buildPagination(i) {
      const pagination = buildNode({
        element: "div",
        classNames: ["pagination"],
      });
      // Add 'active' class to show where we are right now with the pagination
      if (i === currentQuestionNo) {
        addClass({
          element: pagination,
          classNames: "active"
        });
      }
      paginationContainer.append(pagination);
    }
}

function disableAllBtns() {
  console.groupCollapsed("disableAllBtns()");

  const allButtons = document.querySelectorAll(".answer-container");
  for (let button of allButtons) {
    addClass({
      element: button,
      classNames: "disabled",
    });
  }

  console.groupEnd();
}

function answerIsCorrect(event) {
  addClass({ // Adds the `correct` class to the button that was clicked
    element: event.target,
    classNames: "correct",
  });
  
  disableAllBtns(); // Disable all buttons
  setNodeDisabled({ // Simulate re-enabling the NEXT button after 0.3 seconds
    node: nextButton,
    isDisabled: false,
    changeItFast: true,
  });
  
  // Show random correct message drawn from `correctMessages` array
  addTextContent({
    node: messageContainer,
    content: fetchRandomMessage("correct"),
  });    
  addClass({
    element: messageContainer,
    classNames: "correct",
  });
}

function answerIsNotCorrect(event) {
  // Adds the `incorrect` class to the button that was clicked
  addClass({
    element: event.target,
    classNames: "disabled",
  });
  addTextContent({
    node: messageContainer,
    content: fetchRandomMessage("incorrect"),
  });
  addClass({
    element: messageContainer,
    classNames: "incorrect",
  });
  noOfTries++;
  console.info(`Incorrect answser.`);
  console.info(`noOfTries is increased as: ${noOfTries}`);
}

/*
function listenerManager() {

}
*/
function handleAnswerClick(event) {
  console.groupCollapsed("handleAnswerClick()");

  const selectedAnswer = event.target.textContent;
  console.info(`Previous score is ${score}`);

  // Assign currently showing question and answer set to a temp object.
  const currentQuestionSet = shuffledQuestions[currentQuestionIndex];

  // If the answer is correct
  if (selectedAnswer === currentQuestionSet.correctAnswer) {
    answerIsCorrect(event);
  } 
  // If the answer is NOT correct
  else {
    answerIsNotCorrect(event);
  }
  score = calScore();

  console.groupEnd();
}

function nextButtonClick(event) {
  console.groupCollapsed("nextButtonClick()");

  prepareForNewQuestion();
  // spliceQuestion() is called, if there is still a question left in `shuffledQuestions`
  if ((currentQuestionNo <= totalNumOfQuestion) && (shuffledQuestions.length !== 0)) {
    spliceQuestion();
  } else {
    finishSession();
  }
  DisplayPagination();

  console.groupEnd();
}

function prepareForNewQuestion() {
  console.groupCollapsed("prepareForNewQuestion()");

  cleanNode({
    node: messageContainer,
    isDeepClean: false,
  });
  removeAllClass({element: messageContainer});

  // reset no. of tries to 1
  noOfTries = 1;
  console.info("noOfTries is reset.  Currently:", noOfTries);

  console.groupEnd();
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
  separatorContainer.remove();
  
  mainContainer.classList.add("finished");
  messageContainer.className = "";
  messageContainer.classList.add("finished");
  messageContainer.innerHTML = `Well done!<br>You've completed all the questions.<br><br>Your score: ${score} of ${totalNumOfQuestion}`;

  // Remove Next button from display
  if (nextButton) {
    nextButton.remove();
  }

  reloadContainer.classList.remove("hide");
  reloadContainer.addEventListener("click", reloadSession);
}

function reloadSession() {
  // Clear header, previous question, answers, and pagination; then show the complete message
  reloadContainer.classList.add("hide");
  messageContainer.remove();
  headerContainer.remove();
  questionContainer.remove();
  answersContainer.remove();
  paginationContainer.remove();
  separatorContainer.remove();
  
  //mainContainer.classList.add("finished");
  //messageContainer.className = "";
  //messageContainer.classList.add("finished");

  // Remove Next button from display
  if (nextButton) {
    nextButton.remove();
  }
  location.reload();
}

function calScore() {
  if (noOfTries === 1) {
    console.log(`Correct on the first time.`);
    noOfTries = 1;
    console.log(`noOfTries is reset to 1.`);
    score++;
  }
  console.log(`Updated score is: ${score}`);
  return score;
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
// Add event listener to Next button
nextButton.addEventListener("click", nextButtonClick);