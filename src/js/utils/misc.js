// Function to update --vh based on the viewport height
function setVh() {
  let vh = window.innerHeight * 0.01;
  // Calculate the viewport height (window.innerHeight) and multiply it by 0.01 to get the value for 1vh.

  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // if viewport height is 818px, then 1vh should be 8.18px.
}

// Set --vh on load
setVh();

// Update --vh on resize
window.addEventListener('resize', setVh);