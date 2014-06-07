// ==UserScript==
// @name        Footprints Clock with 5&10 Minute Reminders
// @namespace   fpTellMeLongTime
// @description Counts the duration you have been sitting on a ticket and reminds you to finish up if still after 5 minutes and 10 minutes
// @include     https://support.kent.ac.uk/MRcgi/MRTicketPage.pl*
// @version     1
// @grant       none
// ==/UserScript==

var oldTitle = document.title;

newExcitingAlerts = (function () {
  var msg = "Alert!";
  var timeoutId;
  var blink = function() { document.title = document.title == msg ? ' ' : msg; };
  var clear = function() {
    clearInterval(timeoutId);
    document.title = oldTitle;
    window.onmousemove = null;
    timeoutId = null;
  };
  return function () {
    if (!timeoutId) {
      timeoutId = setInterval(blink, 1000);
      window.onmousemove = clear;
    }
  };
}());

function authorize() {
      Notification.requestPermission(function(perm) {
        
      })
}

setTimeout(authorize, 2000);

function show() {
      var notification = new Notification("Ignored Ticket", {
          dir: "auto",
          lang: "",
          body: oldTitle,
          tag: "ignored",
          icon: "https://si0.twimg.com/profile_images/1843582627/at_bmc_icon_generic_normal.png"
      });
      notification.onshow = function() { window.focus(); setTimeout(notification.close, 30000) }

}

function clockHTML() {
  var element = document.createElement("div");
  element.setAttribute("align", "center");
  element.setAttribute("style", "margin-top: -20px");
  element.innerHTML = '<label id="minutes">00</label>:<label id="seconds">00</label>';
  return element;
}

function insertClock() {


var theDiv = document.getElementById("controlPanel");
theDiv.appendChild(clockHTML());


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
            if (totalSeconds == 300 || totalSeconds == 600) {
                newExcitingAlerts();
                window.focus();
                show();
            }
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
}

setTimeout(insertClock(),2000)