// ==UserScript==
// @name           Stanford class: convert PDT/PST to local time
// @description    Convert deadlines and other date&time strings to local time.
// @namespace      http://sepczuk.com
// @include        http://www.ml-class.org/course/quiz*
// @include        http://www.ml-class.org/course/homework*
// @include        http://www.db-class.org/course/homework*
// @include        http://www.db-class.org/course/quiz*
// @downloadURL     https://userscripts.org/scripts/source/118563.user.js
// @updateURL       https://userscripts.org/scripts/source/118563.meta.js
// ==/UserScript==
(function(){
try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;
	
	function getDateConverter() {
		var currentYear = new Date().getFullYear();
	
		return function(dateStr) {	
			
			var dateWithCurrentYear = dateStr + " " + currentYear;
			
			var universalDate = new Date(dateWithCurrentYear);
			return universalDate
			         .toString()
					         //WDAY    MNTH    DAY     YEAR    HH    MM    SS   timezone
			         .replace(/(\w+)\s*(\w+)\s*(\d+)\s*(\d+)\s*(\d+):(\d+):(\d+).*/,
                              '$1, $2 $3 $5:$6 LCL');
		}
	}
	// -----------
	var findDateTimeRegexp = /[A-Z][a-z]+, [A-Z][a-z]+ \d{1,2} \d{1,2}:\d{1,2} [A-Z]+/g;
	$('body').html($('body').html().replace(findDateTimeRegexp,getDateConverter()));	
}catch(e){}
})();