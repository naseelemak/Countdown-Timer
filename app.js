const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// SELECTORS //
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// to add make futureDate be ten days after current date every time (for showcase purposes)
// **uncomment next line for showcase**
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// **comment next line for showcase**
/* let futureDate = new Date(2020, 10, 27, 19, 00, 00); */

// **uncomment next line for showcase**
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 19, 30, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = formatMinutes(futureDate.getMinutes());
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();

giveaway.textContent = `event starts on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}pm`;

// future time in ms
const futureTime = futureDate.getTime();

// FUNCTIONS //
function getRemainingTime() {
  const currentTime = new Date().getTime();
  const t = futureTime - currentTime;

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / oneSecond);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);

    /* let node = document.createTextNode("it has begun");
    deadline.appendChild(node); */
    deadline.innerHTML = `<!-- days -->
          <div class="deadline-format">
            <div>
              <h4 class="days">00</h4>
              <span>days</span>
            </div>
          </div>
          <!-- end of item -->
          <!-- hours -->
          <div class="deadline-format">
            <div>
              <h4 class="days">00</h4>
              <span>hours</span>
            </div>
          </div>
          <!-- end of item -->
          <!-- minutes -->
          <div class="deadline-format">
            <div>
              <h4 class="days">00</h4>
              <span>mins</span>
            </div>
          </div>
          <!-- end of item -->
          <!-- seconds -->
          <div class="deadline-format">
            <div>
              <h4 class="days">00</h4>
              <span>secs</span>
            </div>
          </div>
          <div>
            <h4 class="expired">it has begun</h4>
          </div>
          <!-- end of item -->`;
  }
}

function formatMinutes(uglyMinutes) {
  if (uglyMinutes < 10) {
    return (uglyMinutes = `0${uglyMinutes}`);
  }
  return uglyMinutes;
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
