import contentManager from "./contentManager.js";
import controlManager from "./controlManager.js";
import listenerManager from "./listenerManager.js";

export class Quiz {
  constructor(globalInstance) {
    this.global = globalInstance;
    this.controlMgr = controlManager(this.global); 
    
    // First initialize contentMgr with a placeholder or null for listenerMgr
    this.contentMgr = contentManager(this.global, null, this.controlMgr); 
    
    // Now initialize listenerMgr, passing the contentMgr to it
    this.listenerMgr = listenerManager(this.global, this.contentMgr, this.controlMgr); 
    
    // Now, update contentMgr with the correct listenerMgr
    this.contentMgr = contentManager(this.global, this.listenerMgr, this.controlMgr);
  
  }

  initialize() {
    console.info("quiz.js -> initialize()");
    this.contentMgr.start();
    this.global.nextButton.disabled = true; // Disable `global.nextButton` at the start
    this.global.nextButton.addEventListener("click", this.listenerMgr.nextButtonClick); // Add event listener to Next button
  }
}