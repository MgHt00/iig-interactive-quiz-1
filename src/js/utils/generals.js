export class Generals {

  // To generate a random number
  random(min, max) {
    console.groupCollapsed("random()");
    if (min > max) {
      console.error("Invalid range: min should not be greater than max.");
      return null;
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.info("min:", min, "max:", max,"randonNumber:", randonNumber)
    console.groupEnd();
    return randomNumber;
  }
}