export class DisplayUtils  {
  constructor() {

  }

  // To add textContent content at the desired HTML element
  addTextContent({ node, content }) {
    console.groupCollapsed("addTextContent()");

    if (!(node instanceof HTMLElement)) {
      console.warn("Provided node is not a valid HTML element.");
      console.groupEnd();
      return false; // Explicit return to signal invalid input
    }
    console.info("node: ", node);
    console.info("content: ", content);
    node.textContent = content;

    console.groupEnd();
  }

  // To add class to a HTML node
  addClass({ element, classNames = [] }) {
    console.groupCollapsed("addClass()");

    // Ensure classNames is an array, regardless of whether a string or array is passed
    if (!Array.isArray(classNames)) {
      classNames = [classNames];
    }

    classNames.forEach(c => {
      console.info("Adding class: ", c);
      element.classList.add(c);
    });

    console.info("Styled element: ", element);
    console.groupEnd();
  }

  // To remove specifed classes from the element
  removeClass({ element, classNames = [] }) {
    console.groupCollapsed("removeClass()");

    if (!Array.isArray(classNames)) {
      classNames = [classNames]
    }

    classNames.forEach(c => {
      console.info("Removing class:", c);
      element.classList.remove(c);
    });

    console.info("Completed element:", element);
    console.groupEnd();
  }

  // To remove ALL classes
  removeAllClass({ element }) {
    console.groupCollapsed("removeAllClass()");

    element.className = "";
    console.info("After removing class:", element);
    console.groupEnd();
  }
}