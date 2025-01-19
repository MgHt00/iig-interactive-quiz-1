import { Global } from "./services/globals.js";
import { Quiz } from "./components/quiz.js";

const globalInstance = new Global();
const quizInstance = new Quiz(globalInstance);
quizInstance.initialize();
