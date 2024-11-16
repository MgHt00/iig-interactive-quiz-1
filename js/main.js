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
function cleanIt({node}) {
  node.innerHTML = '';
}

// to build HTML element and add classes (if any)
function buildNode({element, classNames = []}) {
  console.groupCollapsed("buildNode()");

  const BLK = document.createElement(element);
  
  // Add classes if provided
  addClass({ element: BLK, classNames }); 
  
  console.groupEnd();
  return BLK;
}

// to add class to a HTML node
function addClass({ element, classNames = []} ) {
  console.groupCollapsed("addClass()");

  // Ensure classNames is an array, regardless of whether a string or array is passed
  if (!Array.isArray(classNames)) { 
    classNames = [classNames];
  }

  classNames.forEach(c => {
    console.info("element:", element, "class: ", c);
    element.classList.add(c);
  });

  console.info("Styled element: ", element);
  console.groupEnd();
}