import contentManager from "./contentManager.js";
import controlManager from "./controlManager.js";
import listenerManager from "./listenerManager.js";

export class Quiz {
  constructor(globalInstance) {
    this.global = globalInstance;
    this.controlMgr = controlManager(this.global); 
    this.contentMgr = contentManager(this.global, listenerManager, this.controlMgr);
    this.listenerMgr = listenerManager(this.global, contentManager, this.controlMgr);
  }

  initialize() {
    console.info("quiz.js -> initialize()");
    this.contentMgr.start();
    global.nextButton.disabled = true; // Disable `global.nextButton` at the start
    global.nextButton.addEventListener("click", listenerMgr.nextButtonClick); // Add event listener to Next button
  }
}