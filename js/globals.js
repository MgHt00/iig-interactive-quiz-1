/*let totalNumOfQuestion = 5; // Set the total num of questions to show in the quiz.
const mainContainer = document.querySelector("#main-container");
const headerContainer = document.querySelector("#header");
const questionContainer = document.querySelector("#question");
const answersContainer = document.querySelector("#section-answers");
const paginationContainer = document.querySelector("#section-pagination");
const messageContainer = document.querySelector("#message");
const nextButton = document.querySelector("#section-next-btn");
const separatorContainer = document.querySelector("#section-separator");
const reloadContainer = document.querySelector("#section-reload");

let currentQuestionIndex; // Index to match the question and the answers.
let currentQuestionNo = 1; // For paginations and to contol the number of questions to be shown.
let questions = []; // Data will be fetch from JSON
let shuffledQuestions = []; // To copy the questions array to manipulate without touching the original question array.

const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];

const answerClassList = ["ans-a", "ans-b", "ans-c", "ans-d"];
const alphabetImg = ["assets/a.png", "assets/b.png", "assets/c.png", "assets/d.png"];
const alphabetAlt = ["a", "b", "c", "d"];

let noOfTries = 1;
let score = 0;*/

function Global() {
  this.mainContainer = document.querySelector("#main-container");
  this.headerContainer = document.querySelector("#header");
  this.questionContainer = document.querySelector("#question");
  this.answersContainer = document.querySelector("#section-answers");
  this.paginationContainer = document.querySelector("#section-pagination");
  this.messageContainer = document.querySelector("#message");
  this.nextButton = document.querySelector("#section-next-btn");
  this.separatorContainer = document.querySelector("#section-separator");
  this.reloadContainer = document.querySelector("#section-reload");

  /*let totalNumOfQuestion = 5; // Set the total num of questions to show in the quiz.
  let currentQuestionNo = 1; // For paginations and to contol the number of questions to be shown.*/
  /*  
    let questions = []; // Data will be fetch from JSON
    let shuffledQuestions = []; // To copy the questions array to manipulate without touching the original question array.
    let currentQuestionIndex; // Index to match the question and the answers.
  */
  /*const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
  const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];*/
/*
  const answerClassList = ["ans-a", "ans-b", "ans-c", "ans-d"];
  const alphabetImg = ["assets/a.png", "assets/b.png", "assets/c.png", "assets/d.png"];
  const alphabetAlt = ["a", "b", "c", "d"];
*/
  /*let noOfTries = 1;
  let score = 0;*/
}

Global.prototype = mainFunctions;

