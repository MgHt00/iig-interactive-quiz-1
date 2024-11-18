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
}

Global.prototype = mainFunctions;

