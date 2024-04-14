
const ourStoryImg = document.getElementById('ourstory-img');
const overlay = document.getElementById('overlay');
function showOverlay() {
  overlay.style.display = 'flex';
  ourStoryImg.classList.add('blury');
}

function hideOverlay() {
  overlay.style.display = 'none';
  ourStoryImg.classList.remove('blury');
}


ourStoryImg.addEventListener('mouseenter', showOverlay);
ourStoryImg.addEventListener('mouseleave', hideOverlay);


// After our page loads, try to
// find the time and day and
// highlight the opening hours
// Add a note if we're closing soon
document.addEventListener('DOMContentLoaded', function(){
  let today = new Date();
  let currentDay = getDay(today).toLowerCase();
  let targetRow = document.getElementById("tr-opening-hours-" + currentDay);

  // <i class="bi bi-arrow-left">
  let cellArrow = targetRow.querySelector(".opening-hours-arrow");
  cellArrow.innerHTML = "<i class='bi bi-arrow-left'>";

  if (currentDay != "sunday") {
    // check if we close soon
  }
});

// Helper functions
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getDay(date) {
  let num = date.getDay() - 1;
  if (num < 0) { num = 6; }

  return weekdays[num];
}