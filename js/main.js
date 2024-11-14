function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// To disable HTML node. mode is for fast or with animation
function makeItDisabled(node, mode) {
  if (!mode) {
    // Simulate disabling the button after 0.3 seconds 
    // and add `disabled` class
    setTimeout(() => {
      node.disabled = true;
      node.classList.add("disabled");
    }, 300);
  } else {
    node.disabled = true;
    node.classList.add("disabled");
  }
}

// toggling the disabled state of a node with an optional delay
function setNodeDisabled({ node, isDisabled, fastOrSlow }) {
  console.groupCollapsed("setNodeDisabled()");
  console.info("Speed option:", fastOrSlow);

  const applyState = () => {
    node.disabled = isDisabled;
    if (isDisabled) {
      node.classList.add("disabled");
    } else {
      node.classList.remove("disabled");
    }
  };

  if (!fastOrSlow && isDisabled) { // Use setTimeout only when isDisabled is true, and if fastOrSlow is false.
    setTimeout(applyState, 300); 
  } else {
    applyState();
  }

  console.groupEnd();
}



// to clean HTML node
function cleanIt(node) {
  node.innerHTML = '';
}

// to build HTML element and add classes (if any)
function buildNode({element, classNames = []}) {
  console.groupCollapsed("buildNode()");

  const BLK = document.createElement(element);
  if(classNames.length !== 0) {
    addClass(BLK, ...classNames);
  }
  console.groupEnd();
  return BLK;
}

// to add class to a HTML node
function addClass(element, ...classNames) {
  console.groupCollapsed("addClass()");
  //console.info(classNames);
  console.info(element);
  classNames.forEach(c => {
    console.info("class: ", c);
    element.classList.add(c);
  });
  console.info("Styled element: ", element);
  console.groupEnd();
}