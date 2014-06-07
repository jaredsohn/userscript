// ==UserScript==
// @name        Harvest Dock Badge
// @namespace   http://fluidapp.com
// @description Displays a dock badge with total logged hours for the day
// @include     *.harvestapp.com/*
// @author      Chris Scharf
// @version     1.0.0
// ==/UserScript==

var harvestTimer  = null;
var totalDuration = document.getElementById('total_duration');;

(function () {
  if (window.fluid) {    
    updateBadge();
    window.setInterval(updateBadge, 3000);
  } // end if fluid
})();

function updateBadge() {
  if (totalDuration) {
    var time = totalDuration.innerHTML;
    
    if (isTimerStopped()) {
      time = '('+time+')';
    }
    
    window.fluid.dockBadge = time;
  }
}

function isTimerStopped() {
  try {
    return (window.timesheet.daily_stopwatch_timer_running_id == "");
  } catch(e) {
    return true;
  }
}