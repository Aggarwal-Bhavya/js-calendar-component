import "./styles.css";

console.log("Javascript is running");

var months = [
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
  "December"
];

var weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var date = new Date();

function generateCalendar(date) {
  var today = new Date();

  var calendar = document.getElementById("calendar");
  if (calendar) {
    calendar.remove();
  }

  var table = document.createElement("table");
  table.id = "calendar";

  var trHeader = document.createElement("tr");
  trHeader.className = "weekends";

  weekDays.forEach(function (day) {
    var th = document.createElement("th");

    var d = document.createTextNode(day.substring(0, 3));

    th.appendChild(d);
    trHeader.appendChild(th);
  });

  // console.log(trHeader);
  table.appendChild(trHeader);

  // getting the first day and last day for the current date month
  var weekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  console.log(lastDay);

  var tr = document.createElement("tr");
  var td = "";
  var empty = "";
  var btn = document.createElement("button");
  var week = 0;

  while (week < weekDay) {
    td = document.createElement("td");
    empty = document.createTextNode("");
    td.appendChild(empty);
    tr.appendChild(td);
    week++;
  }

  for (var i = 1; i <= lastDay; ) {
    while (week < 7) {
      td = document.createElement("td");
      var text = document.createTextNode(i);
      btn = document.createElement("button");
      btn.className = "btn-day";
      week++;

      if (i <= lastDay) {
        var currentDate = new Date(date.getFullYear(), date.getMonth(), i);
        if (currentDate < today) {
          btn.disabled = true;
          btn.classList.add("disabled");
        }
        i++;
        btn.appendChild(text);
        td.appendChild(btn);
      } else {
        text = document.createTextNode("");
        td.appendChild(text);
      }
      tr.appendChild(td);
    }

    table.appendChild(tr);

    tr = document.createElement("tr");

    week = 0;
  }

  console.log(table);
  var tableContent = document.getElementById("table");
  tableContent.appendChild(table);
  changeHeader(date);
}

function changeHeader(dateHeader) {
  var month = document.getElementById("month-header");
  if (month.childNodes[0]) {
    month.removeChild(month.childNodes[0]);
  }
  var headerMonth = document.createElement("h1");
  var textMonth = document.createTextNode(
    months[dateHeader.getMonth()].substring(0, 3) +
      " " +
      dateHeader.getFullYear()
  );
  headerMonth.appendChild(textMonth);
  month.appendChild(headerMonth);
}

document.getElementById("prevBtn").addEventListener("click", function () {
  date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  generateCalendar(date);
});

document.getElementById("nextBtn").addEventListener("click", function () {
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  generateCalendar(date);
});

document.onload = generateCalendar(date);
