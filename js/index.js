// Author: Soorya, John
const ourStoryImg = document.getElementById('ourstory-img');
const overlay = document.getElementById('overlay');

function showOverlay() {
  overlay.style.display = 'flex';
  ourStoryImg.classList.add('blurry');
}

function hideOverlay() {
  overlay.style.display = 'none';
  ourStoryImg.classList.remove('blurry');
}

// Handle when we hover over the image
ourStoryImg.addEventListener('mouseenter', showOverlay);

// and when we stop hovering over the blurry div
overlay.addEventListener("mouseleave", hideOverlay);


// After our page loads, try to
// find the time and day and
// highlight the opening hours
// Add a note if we're closing soon
// Author: John
const openingTimes = {
  monday:    { Open: "09:00",  Close: "18:00" },
  tuesday:   { Open: "09:00",  Close: "18:00" },
  wednesday: { Open: "09:00",  Close: "18:00" },
  thursday:  { Open: "09:00",  Close: "18:00" },
  friday:    { Open: "10:00",  Close: "16:00" },
  saturday:  { Open: "10:00",  Close: "16:00" },
  sunday:    { Open: "Closed", Close: ""}
};

document.addEventListener('DOMContentLoaded', function() {
  // Dynamically load in the opening times, use above table to set
  for (day in openingTimes) {
    let WeekDay = day.substring(0, 1).toUpperCase() + day.substring(1, 10);

    //tr-opening-hours-
    let row = document.querySelector("#tr-opening-hours-" + day);
    row.querySelector(".opening-hours-day").innerHTML = WeekDay;

    if (openingTimes[day].Open.toLowerCase() == "closed") {
      row.querySelector(".opening-hours-time").innerHTML = "Closed";
    } else {
      row.querySelector(".opening-hours-time").innerHTML = openingTimes[day].Open + " - " + openingTimes[day].Close;
    }
  }

  let now = new Date();
  let currentDay = getDay(now).toLowerCase();
  let targetRow = document.getElementById("tr-opening-hours-" + currentDay);

  let cellArrow = targetRow.querySelector(".opening-hours-arrow");
  cellArrow.innerHTML = "<i class='bi bi-arrow-left'>";

  if (currentDay != "sunday") {
    // check if we close soon
    let cellNote = targetRow.querySelector(".opening-hours-note");
    let day = openingTimes[currentDay];
    let openTime = new Date(now.toDateString() + " " + day.Open);
    let closeTime = new Date(now.toDateString() + " " + day.Close);
    
    let minutesSinceOpened = datediff("minute", openTime, now);
    let minutesUntilClosed = datediff("minute", now, closeTime);

    // console.log("Minutes since opened: " + minutesSinceOpened);
    // console.log("Minutes until closed: " + minutesUntilClosed);

    if (minutesSinceOpened >= -30 && minutesSinceOpened < 0) {
      // We are opening in the next 30 minutes
      cellNote.innerHTML = "Opens soon";
    } else if (minutesSinceOpened <= 30 && minutesSinceOpened >= 0) {
      // We opened in the last 30 minutes
      cellNote.innerHTML = "Just opened";
    } else if (minutesUntilClosed <= 30 && minutesUntilClosed >= 0) {
      // We are closing in the next 30 minutes
      cellNote.innerHTML = "Closes soon";
    } else if (minutesUntilClosed >= -30 && minutesUntilClosed < 0) {
      // We closed in the last 30 minutes
      cellNote.innerHTML = "Just closed";
    } else if (now >= openTime && now <= closeTime) {
      cellNote.innerHTML = "Open";
    } else {
      cellNote.innerHTML = "Closed";
    }
  }
});

// Helper functions
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getDay(date) {
  // Monday is the start of the week, not Sunday!
  let num = date.getDay() - 1;
  if (num < 0) { num = 6; }

  return weekdays[num];
}

function datediff(component, start, end) {
  let diff = end - start;

  switch (component) {
    case "ms", "milliseconds":
      return diff;
    case "s", "second":
      return diff / 1000;
    case "m", "minute":
      return diff / (1000 * 60);
    case "h", "hour":
      return diff / (1000 * 60 * 60);
    case "d", "day":
      return diff / (1000 * 60 * 60 * 24);
    default:
        return 0;
  }
}