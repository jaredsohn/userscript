// ==UserScript==
// @name              Facebook - Local timestamps
// @namespace         http://userscripts.org/users/VincentRemond
// @description       Replaces all timestamps of facebook with local timestamps.
// @include           *.facebook.com*
// ==/UserScript==

// Script widely inspired on this script : http://userscripts.org/scripts/show/58452

function leadingZero(integer,size) {
	var res = integer.toString();
	while(res.length < size) {
		res = '0' + res;
	}
	return res;
}

function toRFC2822(date) {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	//unsafeWindow.console.log(date);
	return days[date.getDay()]
		+ ', '
		+ leadingZero(date.getDate(), 2)
		+ ' '
		+ months[date.getMonth()]
		+ ' '
		+ leadingZero(date.getFullYear(), 4)
		+ ' '
		+ leadingZero(date.getHours(), 2)
		+ ':'
		+ leadingZero(date.getMinutes(), 2)
		+ ':'
		+ leadingZero(date.getSeconds(), 2)
		+ ' '
		+ (date.getTimezoneOffset() > 0 ? '-' : '+')
		+ leadingZero(Math.floor(Math.abs(date.getTimezoneOffset()) / 60), 2)
		+ leadingZero(Math.abs(date.getTimezoneOffset()) % 60, 2);
}

function ReplaceTimeStamps() {
	var abbrs = document.getElementsByTagName("abbr");
	for (i=0; i < abbrs.length; i++) {
		if(abbrs[i].className == 'timestamp') {
			abbrs[i].className = 'timestamp gm-localized';
			abbrs[i].title = toRFC2822(new Date(abbrs[i].title));
		}
	}
}

function checkForUpdate() {
	document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
	setTimeout(ReplaceTimeStamps, 0);
	document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();
