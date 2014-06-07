// ==UserScript==
// @name           Auto Check-in to Southwest Flights
// @namespace      http://userscripts.org/users/83813
// @description    Automatically check in to Southwest Airline flights at the appropriate time. This can be used to get into the A boarding group.
// @include        http://southwest.com/#*
// @include        http://southwest.com/?*
// @include        http://southwest.com/*
// @include        http://southwest.com/flight/selectPrintDocument*
// @include        http://southwest.com/flight/retrieveCheckin*
// @include        http://southwest.com/flight/*
// @include        http://www.southwest.com/#*
// @include        http://www.southwest.com/?*
// @include        http://www.southwest.com/*
// @include        http://www.southwest.com/flight/selectPrintDocument*
// @include        http://www.southwest.com/flight/retrieveCheckin*
// @include        http://www.southwest.com/flight/*
// @copyright     2009+, Nicholas Buroojy (http://userscripts.org/users/83813) 
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// 12/2009
// version 1.1
//
// TODO: Use Southwest's server's time instead of the client's clock.
// TODO: Fix margin.
// TODO: Test select passenger page.

/////////////  HOME PAGE  ////////////////

var globalSubmitDate;

/**
 * @brief Submit the check in form on the southwest homepage.
 */
function submitNow()
{
  var form = document.getElementById("itineraryLookup");
  form.submit();
}


/**
 * @brief Display the countdown.
 *
 * TODO: Some formatting is wrong eg ("1:0:12" means 1 hour and 12 seconds remain). Make sure everything is represented with 2 digits.
 */
function displayCountdown()
{

  var area = document.getElementById("countdown");
  var timeRemain = globalSubmitDate - (new Date());
  var hours = Math.floor(timeRemain / (1000 * 60 * 60));
  var minutes = Math.floor(timeRemain / (1000 * 60)) % 60;
  //round to the nearest second
  var seconds = Math.floor((timeRemain+500) / (1000)) % 60;
  //Don't print negative time.
  if (hours < 0 || minutes < 0 || seconds < 0)
    {
      area.innerHTML = "<br> Please Wait... <br/>";
      return;
    }
  area.innerHTML = "<br> Time Remaining: <br/>";
  //If 0 hours remain, omit them.
  if (hours != 0)
    area.innerHTML += hours + ":";
  //Add padding to minute
  if (minutes < 10)
    area.innerHTML += "0";
  area.innerHTML += minutes + ":";
  //Add padding to second
  if (seconds < 10)
    area.innerHTML += "0";
  area.innerHTML += seconds;
}


/**
 * @brief Updates the countdown every second.
 */
function displayCountdownWrapper()
{
  window.setInterval(displayCountdown, 1000);
}


/**
 * @brief Begins the delay at the next even second.
 */
function beginDelay()
{
  //Build a date 
  var submitDate = new Date();
  submitDate.setMonth(document.getElementById("month-input").value - 1);
  submitDate.setDate(document.getElementById("day-input").value);
  submitDate.setFullYear(document.getElementById("year-input").value);
  submitDate.setHours(document.getElementById("hour-input").value);
  submitDate.setMinutes(document.getElementById("minute-input").value);
  submitDate.setSeconds(document.getElementById("second-input").value);
  submitDate.setMilliseconds(0);
	
  var now = new Date();
	
  //Install the timeout to submit the form.
  window.setTimeout(submitNow, submitDate - now);	

  globalSubmitDate = submitDate;
  //Install a short term timeout to call the countdown wrapper at the beginning of the next second.
  window.setTimeout(displayCountdownWrapper, (submitDate - now) % 1000);	

}


/**
 * @brief Builds and displays the delay menu (including the time selection and the delay button).
 */
function displayDelayMenu()
{
  //var first = document.getElementsByClassName("headerAboveSubsection airBackground")[0];
  //var first = document.getElementsByClassName(" ua_js_yes")[0];
  var first = document.getElementsByClassName("skipNavigationLink")[0];

  //All of our stuff will go in this span.
  var newnode = document.createElement("span");
  newnode.setAttribute('id','foo');
  dateSelect = document.createElement("span");
  dateSelect.setAttribute('id','date-select');

  //The big label at the top of the menu
  mainLabel = document.createElement("label");
  mainLabel.setAttribute('style','display:block; font-weight:bold; color:#FF0066; font-size:14pt; margin:4px; margin-top:75px');
  mainLabel.innerHTML = "When do you want to check in?";
  dateSelect.appendChild(mainLabel);

  //The date portion.
  dateLabel = document.createElement("label");
  dateLabel.setAttribute('style','display:block; font-weight:bold; color:#FF0066; margin-left:4px; margin-top:60px');
  dateLabel.innerHTML = "Date (mm/dd/yyyy)";
  dateSelect.appendChild(dateLabel);

  monthInput = document.createElement("input");
  monthInput.setAttribute('id','month-input');
  monthInput.setAttribute('type','text');
  monthInput.setAttribute('maxlength','2');
  monthInput.setAttribute('size','2');
  monthInput.setAttribute('style','margin-left:4px');
  dateSelect.appendChild(monthInput);

  dayInput = document.createElement("input");
  dayInput.setAttribute('id','day-input');
  dayInput.setAttribute('type','text');
  dayInput.setAttribute('maxlength','2');
  dayInput.setAttribute('size','2');
  dayInput.setAttribute('style','margin-left:4px');
  dateSelect.appendChild(dayInput);

  yearInput = document.createElement("input");
  yearInput.setAttribute('id','year-input');
  yearInput.setAttribute('type','text');
  yearInput.setAttribute('maxlength','4');
  yearInput.setAttribute('size','4');
  yearInput.setAttribute('style','margin-left:4px');
  dateSelect.appendChild(yearInput);

  //The time portion.
  hourInput = document.createElement("input");
  hourInput.setAttribute('id','hour-input');
  hourInput.setAttribute('type','text');
  hourInput.setAttribute('maxlength','2');
  hourInput.setAttribute('style','margin-left:4px');
  hourInput.setAttribute('size','2');

  minuteInput = document.createElement("input");
  minuteInput.setAttribute('id','minute-input');
  minuteInput.setAttribute('type','text');
  minuteInput.setAttribute('maxlength','2');
  minuteInput.setAttribute('size','2');
  minuteInput.setAttribute('style','margin-left:4px');

  secondInput = document.createElement("input");
  secondInput.setAttribute('id','second-input');
  secondInput.setAttribute('type','text');
  secondInput.setAttribute('maxlength','2');
  secondInput.setAttribute('size','2');
  secondInput.setAttribute('style','margin-left:4px');

  dateSelect.innerHTML += "<br/>";

  timeLabel = document.createElement("label");
  timeLabel.setAttribute('style','display:block; font-weight:bold; color:#FF0066; margin-left:4px; margin-top:10px');
  timeLabel.innerHTML = "Time (hh:mm:ss, 24-hour format)";
  dateSelect.appendChild(timeLabel);	

  dateSelect.appendChild(hourInput);
  dateSelect.appendChild(minuteInput);
  dateSelect.appendChild(secondInput);

  newnode.appendChild(dateSelect);

  newnode.innerHTML += "<br/>";

  //The delay button.
  delayForm = document.createElement("form");
  delayForm.setAttribute('method','POST');
  delayButton = document.createElement("input");
  delayButton.setAttribute('id','delay-button');
  delayButton.setAttribute('type','button');
  delayButton.setAttribute('style','margin-left:20px');
  delayButton.setAttribute('value','Start Delay');
  delayButton.addEventListener("click", beginDelay, true);
  delayForm.appendChild(delayButton);
  newnode.appendChild(delayForm);

  //The area that displays how much time remains before the form is submitted.
  countdownArea = document.createElement("span");
  countdownArea.setAttribute('id','countdown');
  countdownArea.setAttribute('style','display:block; font-weight:bold; color:#FF0066; font-size:14pt; margin:4px');
  countdownArea.innerHTML = "Click DELAY to begin waiting.";

  newnode.appendChild(countdownArea);

  first.innerHTML = "";
  first.appendChild(newnode);
	
}

/**
 * @brief Edits the home page; adds a delay button
 *
 * TODO Error handling. (Auto notify the developer when southwest page changes)
 */
function homePageFormEdit()
{
  //Overwrite the earlybird link -- the users of this script won't be needing this :-P.
  var element = document.getElementsByClassName("swa_header_intro wcm_intro")[0];
  element.innerHTML = "";
  // create the new submit button.
  newForm = document.createElement("form");
  newForm.setAttribute('method','POST');
  newitem = document.createElement("input");
  newitem.setAttribute('id','submitCheckInTimeout');
  newitem.setAttribute('name','retrievePaxListTimeout');
  newitem.setAttribute('type','button');
  newitem.setAttribute('value','Set Start Time');
  // make the click call our wait function
  newitem.addEventListener("click", displayDelayMenu, true);
  newForm.appendChild(newitem);
  element.appendChild(newForm);
}

/////////////  SELECT PASSENGER PAGE  ////////////////

//automatically select all passengers and submit the form
function autoPassengerPage()
{

  //find error notification
  if(document.title == "Error")
    {
      return;
    }

  //Select all the text boxes.
  var node_list = document.getElementsByTagName('input');
  for (var i = 0; i < node_list.length; i++) {
    var node = node_list[i];
    if (node.getAttribute('type') == 'checkbox') {
      node.checked = true;
    }
  } 

  //Click the print button
  var button = document.getElementById("printDocumentsButton");
  button.click();

}

//case of the select boarding pass page (regex match the url)
if(/selectPrintDocument/.test(document.location.href))
  {
    autoPassengerPage();
  }
//case of the home page
 else if(/retrieveCheckinDoc/.test(document.location.href))
   {
     homePageFormEdit();
   }
