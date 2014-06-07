// ==UserScript==
// @name          	GomTV-Localize-Schedule
// @namespace     	http://leafxor.no-ip.org
// @description	  	Localizes the times in GomTV's schedule to your local time
// @include       	http://www.gomtv.net/schedule/*
// @resource		jquery		http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

(function() {
	jQueryText = GM_getResourceText('jquery');
	eval(jQueryText);
	(function($) {
		
		function ShortDate(ms) {
			past = false;
			if(ms < 0) {
				past = true; 
				ms = -ms;
			}
			days = 0; 
			hours = 0;
			minutes = 0;
			seconds = 0;

			if(ms > (24*60*60*1000)) { // days
				days = Math.floor(ms / (24*60*60*1000));
				ms -= (days * 24*60*60*1000);
			}
			if(ms > (60*60*1000)) { // hours
				hours = Math.floor(ms / (60*60*1000));
				ms -= (hours * 60*60*1000);
			}
			if(ms > 60*1000) { // minutes
				minutes = Math.floor(ms / (60*1000));
				ms -= (minutes * 60*1000);
			}
			if(ms > 1000) { // seconds
				seconds = Math.floor(ms / 1000);
			}
			parts = [days, hours, minutes, seconds];
			suffixes = ["d", "h", "m", "s"];
			datestring = "";
			for(i = 0; i < 4; i++) {
				if(parts[i] > 0)
					datestring += parts[i] + suffixes[i] + " ";
			}
			datestring = datestring.substr(0, datestring.length - 1);
			if(true == past)
				datestring += " ago";
			return datestring;
		}

		/*
		1. 	Check if we've stored the user's timezone. 
		2. 	If not, fetch it:

			2.1. 	Fetch https://ssl.gomtv.net/userinfo/modifyAuth.gom
			2.2. 	Iterate over #n_body_members dl until we find something matching "^Tim-
					e Zone" in <dt>
			2.3. 	Store the time zone (textContent of dd) and parse its offset from UTC

		3. 	Iterate over "#sche_left_wraper table tr th p" (sic)

			3.1. 	Parse the time and date. 
				3.1.1. 	GomTV uses date format "NNN. dd, yyyy HH: mm"
			3.3. 	Apply the offset to the date and time. 
				3.3.1.	Subtract the hours. If the hours go below zero, subtract a day and add 24. 
		*/
		$("#sche_left_wraper table tr th p").each(function(i, element) {
			element = $(element);
			timestamp = element.text().trim();
			index = timestamp.indexOf("|");
			timestamp = timestamp.substr(index+1).trim();
			chunks = timestamp.split(" ");

			month = chunks[0].substr(0, 3);
			day = chunks[1].substr(0, chunks[1].length - 1);
			year = chunks[2];
			time = chunks[3];

			date_string = day + " " + month + " " + year;
			time_string = time + " +0900";
			datetime_string = date_string + " " + time_string;
			date_object = new Date(datetime_string);
			
			offset = date_object.getTimezoneOffset();
			if(0 == offset)
				timezone = "UTC+0";
			else if (0 > offset)
				timezone = "UTC+" + (-offset / 60);
			else
				timezone = "UTC" + (-offset / 60);

			hours = date_object.getHours();
			minutes = date_object.getMinutes();
			if(minutes < 10)
				minutes = "0" + minutes;
			if(hours < 10)
				hours = "0" + hours;
			
			day = date_object.getDate();
			monthIndex = date_object.getMonth();
			months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			month = months[monthIndex];
			year = date_object.getFullYear();
			date = day + " " + month + ", " + year;

			datetime_string = hours + ":" + minutes + " " + date + " " + timezone + "";
			ms = date_object.getTime() - new Date().getTime();
			datetime_string += "<br />" + ShortDate(ms);
			element.html(datetime_string);
			element.data('timestamp', date_object);
		});
	})(jQuery);
})();
