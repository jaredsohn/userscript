// the other script by another author did not work: it was not greasemonkey compatible code
// also the include line did not account for ?usejournal= in the url (which happens when you click
//			the update button on your profile page, on that of a community, etc)

// ==UserScript==
// @name LJ: time updater
// @version	1.0
// @namespace	http://doorknobsoft.com/greasemonkey/scripts/
// @description	Updates the time automatically while making a livejournal post
// @include	http://www.livejournal.com/update.bml*
// ==/UserScript==

( function() {
	// change 'seconds' to make it update faster or slower
	var seconds = 3;
	var interval = seconds * 1000;
	
	function update_time() {
		var d = new Date();
		
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var year = d.getFullYear();
		
		var hour = d.getHours();
		var min = d.getMinutes();
			
		var updateForm = document.forms.namedItem("updateForm");
		updateForm.elements.namedItem("date_ymd_mm").value = month;
		updateForm.elements.namedItem("date_ymd_dd").value = day;
		updateForm.elements.namedItem("date_ymd_yyyy").value = year;
		updateForm.elements.namedItem("hour").value = hour;
		updateForm.elements.namedItem("min").value = min;	
	}
	
	setInterval(update_time, interval);
})();