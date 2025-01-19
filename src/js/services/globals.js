import { Generals } from "../utils/generals.js";
import { DomUtils } from "../utils/domUtils.js";
import { DisplayUtils } from "../utils/displayUtils.js";

export class Global {
  constructor() {
    this.mainContainer = document.querySelector("#main-container");
    this.headerContainer = document.querySelector("#header");
    this.questionContainer = document.querySelector("#question");
    this.answersContainer = document.querySelector("#section-answers");
    this.paginationContainer = document.querySelector("#section-pagination");
    this.messageContainer = document.querySelector("#message");
    this.nextButton = document.querySelector("#section-next-btn");
    this.separatorContainer = document.querySelector("#section-separator");
    this.reloadContainer = document.querySelector("#section-reload");

    this.generals = new Generals();
    this.domUtils = new DomUtils();
    this.displayUtils = new DisplayUtils();
  }

  random(min, max) {
    return this.generals.random(min, max);
  }

  setNodeDisabled({ node, isDisabled, changeItFast }) {
    return this.domUtils.setNodeDisabled({ node, isDisabled, changeItFast });
  }

  cleanNode({ node, isDeepClean = false }) {
    return this.domUtils.cleanNode({ node, isDeepClean });
  }

  buildNode({ element, classNames =[] }) {
    return this.domUtils.buildNode({ element, classNames });
  }

  addTextContent({ node, content }) {
    return this.displayUtils.addTextContent({ node, content });
  }

  addClass({ element, classNames = [] }) {
    return this.displayUtils.addClass({ element, classNames });
  }

  removeClass({ element, classNames = [] }) {
    return this.displayUtils.removeClass({ element, classNames });
  }

  removeAllClass({ element }) {
    return this.displayUtils.removeAllClass({ element });
  }
}