export default listenerManager;

function listenerManager(global, contentMgr, controlMgr) {
  const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
  const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];

  let noOfTries = 1;
  let score = 0;

  // When the answer button is clicked
  function handleAnswerClick(event) {
    console.groupCollapsed("handleAnswerClick()");
  
    const selectedAnswer = event.target.textContent;
    console.info(`Previous score is ${score}`);
    
    const currentQuestionSet = fetchCurrentQuestionSet();
  
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

  // Assign currently showing question and answer set to a temp object.
  function fetchCurrentQuestionSet() {
    console.groupCollapsed("fetchCurrentQuestionSet()");

    console.info("contentMgr.currentQuestionIndex:", contentMgr.getCurrentQuestionIndex());
    let fetchedArray = contentMgr.getShuffledQuestionsArray();
    let fetchedIndex = contentMgr.getCurrentQuestionIndex();

    console.groupEnd();
    return fetchedArray[fetchedIndex];
  }
  
  function answerIsCorrect(event) {
    global.addClass({ // Adds the `correct` class to the button that was clicked
      element: event.target,
      classNames: "correct",
    });
    
    controlMgr.disableAllBtns(); // Disable all buttons
    global.setNodeDisabled({ // Simulate re-enabling the NEXT button after 0.3 seconds
      node: global.nextButton,
      isDisabled: false,
      changeItFast: true,
    });
    
    // Show global.random correct message drawn from `correctMessages` array
    global.addTextContent({
      node: global.messageContainer,
      content: fetchRandomMessage("correct"),
    });
    
    // Remove all classes of the global.messageContainer
    global.removeAllClass({element: global.messageContainer});
  
    global.addClass({
      element: global.messageContainer,
      classNames: "correct",
    });
  }
  
  function answerIsNotCorrect(event) {
    // Adds the `incorrect` class to the button that was clicked
    global.addClass({
      element: event.target,
      classNames: "disabled",
    });
    global.addTextContent({
      node: global.messageContainer,
      content: fetchRandomMessage("incorrect"),
    });
  
    // Remove all classes of the global.messageContainer
    global.removeAllClass({element: global.messageContainer});
  
    global.addClass({
      element: global.messageContainer,
      classNames: "incorrect",
    });
    noOfTries++;
    console.info(`Incorrect answser.`);
    console.info(`noOfTries is increased as: ${noOfTries}`);
  }
  
  function nextButtonClick(event) {
    console.groupCollapsed("nextButtonClick()");
  
    prepareForNewQuestion();
    if (isWithinQuestionLimit() && isShuffledQuestionsArrayNotEmpty()) { // calling sub-functions
      spliceQuestion(); // spliceQuestion() is called, if there is still a question left in `shuffledQuestionsArray`
    } else {
      finishSession();
    }
    controlMgr.displayPagination();

    // Sub-function #1
    function isWithinQuestionLimit() {
      const result = controlMgr.getCurrentQuestionNo() <= controlMgr.getTotalNumOfQuestion();
      console.log(`isWithinQuestionLimit: ${result}`);
      return result;
    }
  
    // Sub-function #2
    function isShuffledQuestionsArrayNotEmpty() {
      const result = contentMgr.getShuffledQuestionsArray().length !== 0;
      console.log(`isShuffledQuestionsArrayNotEmpty: ${result}`);
      return result;
    } 
  
    console.groupEnd();
  }
  
  function prepareForNewQuestion() {
    console.groupCollapsed("prepareForNewQuestion()");
  
    global.cleanNode({
      node: global.messageContainer,
      isDeepClean: false,
    });
    global.removeAllClass({element: global.messageContainer});
  
    // reset no. of tries to 1
    noOfTries = 1;
    console.info("noOfTries is reset.  Currently:", noOfTries);
  
    console.groupEnd();
  }
  
  function spliceQuestion() {
    // Delete shown questions from `shuffleQuestions` array
    contentMgr.spliceShuffledQuestionsArray();
  
    // randomQestion() is called again, if there is still a question left after the splice()
    contentMgr.getShuffledQuestionsArrayLength() === 0 ? finishSession() : contentMgr.randomQuestion();
  }
  
  function finishSession() {
    // Clear header, previous question, answers, and pagination; then show the complete message
    global.headerContainer.remove();
    global.questionContainer.remove();
    global.answersContainer.remove();
    global.paginationContainer.remove();
    global.separatorContainer.remove();

    global.removeAllClass({
      element: global.messageContainer,
    });

    global.addClass({
      element: global.mainContainer,
      classNames: "finished",
    });

    global.addClass({
      element: global.messageContainer,
      classNames: "finished",
    });
    
    global.messageContainer.innerHTML = `Well done!<br>You've completed all the questions.<br><br>Your score: ${score} of ${controlMgr.getTotalNumOfQuestion()}`;
  
    // Remove Next button from display
    if (global.nextButton) {
      global.nextButton.remove();
    }
  
    global.removeClass({
      element: global.reloadContainer,
      classNames: "hide",
    });

    global.reloadContainer.addEventListener("click", reloadSession);
  }
  
  function reloadSession() {
    console.groupCollapsed("reloadSession()");
  
    // Clear header, previous question, answers, and pagination; then show the complete message
    global.removeClass({
      element: global.reloadContainer,
      classNames: "hide",
    });
    global.messageContainer.remove();
    global.headerContainer.remove();
    global.questionContainer.remove();
    global.answersContainer.remove();
    global.paginationContainer.remove();
    global.separatorContainer.remove();
    
    // Remove Next button from display
    if (global.nextButton) {
      global.nextButton.remove();
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

  function fetchRandomMessage(status) {
    console.groupCollapsed("fetchRandomMessage()");

    let messageArray;
    switch (status) {
      case 'correct':
        messageArray = correctMessages;
        console.info("Case:", status, " | Array: ", messageArray);
        break;
      case 'incorrect':
        messageArray = wrongMessages;
        console.info("Case:", status, " | Array: ", messageArray);
        break;
    }
    console.groupEnd();
    return messageArray[global.random(0, messageArray.length - 1)];
  }

  return {
    handleAnswerClick,
    nextButtonClick,
  }
}