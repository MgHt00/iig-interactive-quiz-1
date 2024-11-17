function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// toggling the disabled state of a node with an optional delay
function setNodeDisabled({ node, isDisabled, changeItFast }) {
  console.groupCollapsed("setNodeDisabled()");
  
  console.info("Node to change: ", node);
  console.info("isDiabled :", isDisabled);
  console.info("Change it in fast mode:", changeItFast);

  const applyState = () => {
    node.disabled = isDisabled;
    if (isDisabled) {
      node.classList.add("disabled");
    } else {
      node.classList.remove("disabled");
    }
  };

  if (!changeItFast && isDisabled) { // Use setTimeout only when isDisabled is true, and if changeItFast is false.
    setTimeout(applyState, 300); 
  } else {
    applyState();
  }

  console.groupEnd();
}

// to clean HTML node
function cleanNode({ node, isDeepClean = false }) {
  console.groupCollapsed("cleanNode()");

  if (!(node instanceof HTMLElement)) {
    console.warn("Provided node is not a valid HTML element.");
    console.groupEnd();
    return false; // Explicit return to signal invalid input
  }

  if (isDeepClean) {
    console.info("Performing deep cleaning.");
    node.innerHTML = ''; // Removes all child elements and their listeners
  } else {
    console.info("Performing light cleaning.");
    node.textContent = ''; // Removes only text content
  }

  console.groupEnd();
  return true; // Signal successful operation
}

// to build HTML element and add classes (if any)
function buildNode({element, classNames = []}) {
  console.groupCollapsed("buildNode()");
  console.log("Building Node: ", element);
  const BLK = document.createElement(element);
  
  // Add classes if provided
  addClass({ element: BLK, classNames }); 
  
  console.groupEnd();
  return BLK;
}

// to add textContent content at the desired HTML element
function addTextContent({node, content}) {
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

// to add class to a HTML node
function addClass({ element, classNames = []} ) {
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

function removeClass({element, classNames = []}) {
  console.groupCollapsed("removeClass()");

  if(!Array.isArray(classNames)) {
    classNames = [classNames]
  }
  
  classNames.forEach(c => {
    console.info("Removing class:", c);
    element.classList.remove(c);
  });

  console.info("Completed element:", element);
  console.groupEnd();
}

function removeAllClass({element}) {
  console.groupCollapsed("removeAllClass()");
  
  element.className = "";
  console.info("After removing class:", element);
  console.groupEnd();
}