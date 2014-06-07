// ==UserScript==
// @name        Harvest Timer Growl Reminder
// @namespace   http://harvestapp.com
// @description Displays Growl notifications at a user defined interval, reminding you to track your time.
// @include     *
// @author      Mike Green
// @version			0.1.1
// ==/UserScript==

(function () {
    if (window.fluid) {
			var growlInterval = 45000; // (in milliseconds)
			window.growlReminder = window.setInterval(growlAtUser, growlInterval);
			
			// TODO: Create a form to set the notification interval
			
			// Create a link to start/stop the notifications
			var pauseLink = document.createElement('a');
			pauseLink.href = "#";
			pauseLink.innerHTML = "Stop Growl Reminders";
			pauseLink.onclick = function(e) {
				if (window.growlReminder) {
					window.clearInterval(window.growlReminder);
					window.growlReminder = null;
					e.target.innerHTML = "Start Growl Reminders";
				} else {
					window.growlReminder = window.setInterval(growlAtUser, growlInterval);
					e.target.innerHTML = "Stop Growl Reminders";
				}
				return false;
			};
			document.getElementById('mainbody').appendChild(pauseLink);
    }
})();

function timerStopped() {
  try {
    return (window.timesheet.daily_stopwatch_timer_running_id == "");
  } catch(e) {
    return true;
  }
}

function growlAtUser() {
	if (timerStopped()) {
		window.fluid.showGrowlNotification({
			title: "Track your time!"
			, description: "Harvest wants to know what you're working on."
			, priority: 1
		});
	}	
}

// vim: set ts=2 sw=2 smartindent :
