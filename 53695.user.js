// ==UserScript==
// @name		LJ/DW Time Updater
// @namespace	http://axisofevil.net/~xtina
// @description	Updates the time of a new LJ/DW post automatically.
// @include		http://www.livejournal.com/update.bml*
// @include		http://www.dreamwidth.org/update*
// ==/UserScript==

(function() {
	// Change 'seconds' to make it update faster or slower.
	var seconds = 3;
	var interval = seconds * 1000;
	
	function update_time() {
		var backdate = document.getElementById("prop_opt_backdated");
		// If you're not posting the entry out of order...
		if (backdate.checked == false) {
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
	}
	
	setInterval(update_time, interval);
})();
