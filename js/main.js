// Get first date of a week
function startOfWeek(date) {
  var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  return first;
}

//  Array of 12 months
var monthNameArr = [
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
// Array of days full name
var weekNameArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var date = new Date(); // new date object

var calenderDom = document.querySelector(".months"); // Select the calender DOM

// The calender dom function
function randerFunction(select) {
  var month = new Date().getMonth(); // The current month of this year
  var today = new Date().getDate(); // The current day of this month
  var this_year = new Date().getFullYear(); // the current year

  var year = date.getFullYear();

  // Check and show the result to the calender dom
  if (select == "full") {
    // Show the year
    document.getElementById("the-year").innerHTML = year;
    // Clear the month
    document.getElementById("the-month").innerHTML = "";
    document.getElementById("the-week").innerHTML = "";

    // Clear the calender childs
    while (calenderDom.firstChild) {
      calenderDom.removeChild(calenderDom.firstChild);
    }

    // Create all month and date
    for (var i = 0; i < 12; i++) {
      createMonthDom(i, "allMonth");
    }
  } else if (select == "month") {
    // Show the year
    document.getElementById("the-year").innerHTML = year;
    // Show the month
    document.getElementById("the-month").innerHTML = monthNameArr[month];
    document.getElementById("the-week").innerHTML = "";
    //Clear the calender dom childs
    while (calenderDom.firstChild) {
      calenderDom.removeChild(calenderDom.firstChild);
    }
    // Create a single month
    createMonthDom(month, "singleMonth");
  } else {
    // Show the year
    document.getElementById("the-year").innerHTML = year;
    // Show the month
    document.getElementById("the-month").innerHTML = monthNameArr[month];
    // Show the week
    document.getElementById("the-week").innerHTML = today;
    //Clear the calender dom childs
    while (calenderDom.firstChild) {
      calenderDom.removeChild(calenderDom.firstChild);
    }

    createMonthDom(month, "week");
  }

  // Creat month function
  function createMonthDom(month_number, mode) {
    // Get the End date of the month
    var endDate = new Date(date.getFullYear(), month_number + 1, 0).getDate();

    // First day of the month
    date.setMonth(month_number);
    date.setDate(1);
    var firstDay = date.getDay();

    // Create every month section div element
    var monthSection = document.createElement("div");

    // Add class to the div element
    if (mode == "allMonth") {
      var divClass = "col-sm-6 col-md-4 mt-4";
    } else if (mode == "singleMonth" || mode == "week") {
      var divClass = "col-12 mt-4";
    }

    // set the class atribute
    monthSection.setAttribute("class", divClass);
    // Create months date
    var monthDate = `<h4 class="month_name font-lato-bold text-dark">${monthNameArr[month_number]}</h4>
        <div class="days d-flex flex-row flex-wrap">`;
    // add free space at the starting of a week
    if (mode != "week") {
      for (var i = 0; i < firstDay; i++) {
        monthDate += `<div class="blank"></div>`;
      }
    }

    // Add all date
    if (mode == "week") {
      for (
        var i = startOfWeek(new Date());
        i <= startOfWeek(new Date()) + 6;
        i++
      ) {
        if (i <= endDate) {
          if (month_number == month && today == i && year == this_year) {
            monthDate += `<div class="day today">${i}</div>`;
          } else {
            monthDate += `<div class="day">${i}</div>`;
          }
        }
      }
    } else {
      for (var i = 1; i <= endDate; i++) {
        if (month_number == month && today == i && year == this_year) {
          monthDate += `<div class="day today">${i}</div>`;
        } else {
          monthDate += `<div class="day">${i}</div>`;
        }
      }
    }

    monthDate += `</div>`;

    monthSection.innerHTML = monthDate;
    calenderDom.appendChild(monthSection); // all dom element add to the calender dom
  }
}

var day_select = document.querySelector("#day_select");

// call the rander function
randerFunction(day_select.value);

// Select date view
function select_day() {
  randerFunction(day_select.value);
}

// move date to back and forword
function moveDate(action) {
  var currentYear = date.getFullYear();
  if (action == "prev") {
    date.setFullYear(currentYear - 1);
  } else {
    date.setFullYear(currentYear + 1);
  }
  while (calenderDom.firstChild) {
    calenderDom.removeChild(calenderDom.firstChild);
  }
  randerFunction("full");
}
