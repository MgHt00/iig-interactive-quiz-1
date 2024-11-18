const globalMgr = new Global();

(function start() {
  loadJSON();
  globalMgr.nextButton.disabled = true; // Disable `globalMgr.nextButton` at the start
  globalMgr.nextButton.addEventListener("click", nextButtonClick); // Add event listener to Next button
})();

/*function contentManager() {

}
*/
async function loadJSON() {
  console.groupCollapsed("loadJSON()");
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

  console.groupEnd();
}

function randomQuestion() {
  console.groupCollapsed("randomQuestion()");

  globalMgr.setNodeDisabled({
    node: globalMgr.nextButton,
    isDisabled: true,
    changeItFast: true,
  });

  globalMgr.cleanNode({
    node: globalMgr.answersContainer,
    isDeepClean: true,
  }); // Clear previous answers

  // Generate a globalMgr.random question index
  currentQuestionIndex = globalMgr.random(0, (shuffledQuestions.length-1));

  // Display the question
  globalMgr.addTextContent({
    node: globalMgr.questionContainer,
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

  const tempAnswerContainer = globalMgr.buildNode({
                                element: "div", 
                                classNames: ["answer-container", answerClassList[index]],
                              });

  const tempAnswerAlphabet = globalMgr.buildNode({
                              element : "div",
                              classNames: ["answer-alphabet"],
                            });

  const tempAlphabetImg =  globalMgr.buildNode({
                            element : "img",
                          });

  tempAlphabetImg.src = alphabetImg[index];
  tempAlphabetImg.alt = alphabetAlt[index];
 
  const tempAnswerText = globalMgr.buildNode({
                          element : "div",
                          classNames : ["answer-text"],
                        });

  // JS: assign answer
  globalMgr.addTextContent({
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
  globalMgr.answersContainer.append(tempAnswerContainer);
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
  return messageArray[globalMgr.random(0, messageArray.length-1)];
}

/*function controlManager() {

}
*/
function DisplayPagination() {
  console.groupCollapsed("DisplayPagination()");
    
    globalMgr.cleanNode({ // Clear previous pagination (if needed)
      node: globalMgr.paginationContainer,
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
      const pagination = globalMgr.buildNode({
        element: "div",
        classNames: ["pagination"],
      });
      // Add 'active' class to show where we are right now with the pagination
      if (i === currentQuestionNo) {
        globalMgr.addClass({
          element: pagination,
          classNames: "active"
        });
      }
      globalMgr.paginationContainer.append(pagination);
    }
}

function disableAllBtns() {
  console.groupCollapsed("disableAllBtns()");

  const allButtons = document.querySelectorAll(".answer-container");
  for (let button of allButtons) {
    globalMgr.addClass({
      element: button,
      classNames: "disabled",
    });
  }

  console.groupEnd();
}

/*function listenerManager() {

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

function answerIsCorrect(event) {
  globalMgr.addClass({ // Adds the `correct` class to the button that was clicked
    element: event.target,
    classNames: "correct",
  });
  
  disableAllBtns(); // Disable all buttons
  globalMgr.setNodeDisabled({ // Simulate re-enabling the NEXT button after 0.3 seconds
    node: globalMgr.nextButton,
    isDisabled: false,
    changeItFast: true,
  });
  
  // Show globalMgr.random correct message drawn from `correctMessages` array
  globalMgr.addTextContent({
    node: globalMgr.messageContainer,
    content: fetchRandomMessage("correct"),
  });
  
  // Remove all classes of the globalMgr.messageContainer
  globalMgr.removeAllClass({element: globalMgr.messageContainer});

  globalMgr.addClass({
    element: globalMgr.messageContainer,
    classNames: "correct",
  });
}

function answerIsNotCorrect(event) {
  // Adds the `incorrect` class to the button that was clicked
  globalMgr.addClass({
    element: event.target,
    classNames: "disabled",
  });
  globalMgr.addTextContent({
    node: globalMgr.messageContainer,
    content: fetchRandomMessage("incorrect"),
  });

  // Remove all classes of the globalMgr.messageContainer
  globalMgr.removeAllClass({element: globalMgr.messageContainer});

  globalMgr.addClass({
    element: globalMgr.messageContainer,
    classNames: "incorrect",
  });
  noOfTries++;
  console.info(`Incorrect answser.`);
  console.info(`noOfTries is increased as: ${noOfTries}`);
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

  globalMgr.cleanNode({
    node: globalMgr.messageContainer,
    isDeepClean: false,
  });
  globalMgr.removeAllClass({element: globalMgr.messageContainer});

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
  globalMgr.globalMgr.headerContainer.remove();
  globalMgr.questionContainer.remove();
  globalMgr.answersContainer.remove();
  globalMgr.paginationContainer.remove();
  globalMgr.separatorContainer.remove();
  
  globalMgr.mainContainer.classList.add("finished");
  globalMgr.messageContainer.className = "";
  globalMgr.messageContainer.classList.add("finished");
  globalMgr.messageContainer.innerHTML = `Well done!<br>You've completed all the questions.<br><br>Your score: ${score} of ${totalNumOfQuestion}`;

  // Remove Next button from display
  if (globalMgr.nextButton) {
    globalMgr.nextButton.remove();
  }

  globalMgr.reloadContainer.classList.remove("hide");
  globalMgr.reloadContainer.addEventListener("click", reloadSession);
}

function reloadSession() {
  console.groupCollapsed("reloadSession()");

  // Clear header, previous question, answers, and pagination; then show the complete message
  globalMgr.removeClass({
    element: globalMgr.reloadContainer,
    classNames: "hide",
  });
  globalMgr.messageContainer.remove();
  globalMgr.globalMgr.headerContainer.remove();
  globalMgr.questionContainer.remove();
  globalMgr.answersContainer.remove();
  globalMgr.paginationContainer.remove();
  globalMgr.separatorContainer.remove();
  
  // Remove Next button from display
  if (globalMgr.nextButton) {
    globalMgr.nextButton.remove();
  }
  location.reload();

  console.groupEnd();
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