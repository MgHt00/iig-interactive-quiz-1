import { Global } from "./services/globals.js";
import controlManager from "./components/controlManager.js";
import contentManager from "./components/contentManager.js";
import listenerManager from "./components/listenerManager.js";
import { Quiz } from "./components/quiz.js";

const globalInstance = new Global();
const controlMgr = controlManager(globalInstance)

// First initialize contentMgr with a placeholder or null for listenerMgr
let contentMgr = contentManager(globalInstance, null, controlMgr);

const listenerMgr = listenerManager(globalInstance, contentMgr, controlMgr);

// Now, update contentMgr with the correct listenerMgr
contentMgr = contentManager(globalInstance, listenerMgr, controlMgr);

const quizInstance = new Quiz(globalInstance, controlMgr, listenerMgr, contentMgr);
quizInstance.initialize();
