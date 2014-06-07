// ==UserScript==
// @name          Modify GCal Reminder Times
// @namespace     http*://www.google.com/calendar/render*
// @description	  gives more options for reminder times
// @include       http*://www.google.com/calendar/render*
// ==/UserScript==
// Notes:  Modifies the reminder times for Google Calendar Events.  Click on an event, click Edit Event Details,
//	Edit the script to change the available options.  
//	I feel that the default settings, with a gap between 3 hours and 1 day, are lame.   :)
//	Note that this script DOES NOT read reminder times that are not in the overlapping set of default reminder times
//	and times in the script, so if you set an event time with this, then re-open the event, it may not display correctly
//	in the drop down box - but it will be stored in your calendar correctly, unless you save the event again.  
//	Anybody that understands the gcal API wanna fix this?
//	--Rockmaster
//
//   update 2006Nov10 - removed extra "selected" form tags, added 18 hours option.
//


window.addEventListener("click", do_main, false);

function do_main() {
	var existdiv = document.getElementById('ff-op-reminder');
	var existspan = document.getElementById('wi-op-reminder');
	if (existspan) {
		existdiv.removeChild(existspan);
		var newspan = document.createElement('span');
		newspan.setAttribute('id','op-reminder');
		newspan.setAttribute('class','input editable list field-eran');
		newspan.innerHTML = '<select name="eran" id="op-reminder" onchange="_wi_c(this)" size="1"><option value="-1">No reminder</option><option value="60">1 minute</option><option value="300">5 minutes</option><option value="900">15 minutes</option><option value="1800">30 minutes</option><option value="3600">1 hour</option><option value="7200">2 hours</option><option value="43200">12 hours</option><option value="64800">18 hours</option><option value="86400" selected="selected">1 day</option><option value="604800">1 week</option><option value="1209600">2 weeks</option></select><input name="old-eran" value="86400" type="hidden">';
		existdiv.appendChild(newspan);
		}
}

