// ==UserScript==
// @name           mitx-menu-goodies
// @namespace      thomasloch
// @version        0.11
// @description    Add some extra functions to the menu bar
// @include        https://6002x.mitx.mit.edu/*
// ==/UserScript==

/*

MITx Menu Goodies
-----------------

Add some extra functions to the menu bar:
- logout button
- web chat button
- MIT time clock (syncronized with appspot.com timeserver)

*/


unsafeWindow.console.log('Menu goodies loading...');


// offset between UTC and MIT time in seconds
var timezone_offset;
var timezone = "America/Detroit";


var navbar;

var v = document.getElementsByTagName('ul');
//for each(var e in v) {
for(var e, j = 0; (e = v[j]) != null; j++) {
	if(e.getAttribute('class') && (e.getAttribute('class') == 'coursenav') ) {
		navbar = e;
		break;
	}
}

function new_toolbar_item(it) {
	var button = document.createElement("li");
	button.appendChild(it);
	navbar.appendChild(button);
}


// chat link
var chat_link = document.createElement("a");
chat_link.onclick = function() {
	var win = window.open('', 'mitx-webchat', 'width=550,height=450,resizable=yes,status=yes,location=yes');
	var url = 'http://irc.mitx.mit.edu/webchat/';
	try {
		// if this fails due to a permission error, then assume the window is already open and focus it!
		// FIXME: does this work with *all* browsers and settings?
		if((win.location + "").substr(0, url.length) != url) win.location = url;
	} finally {
		win.focus();
	}
	return false;
};
// with this one, the browser's open-in-new-tab/window/copy url/whatever functions should work as expected.
chat_link.setAttribute('href', 'http://irc.mitx.mit.edu/webchat/'); 
chat_link.innerHTML = 'Web chat';
new_toolbar_item(chat_link);


// logout link
var logout_link = document.createElement("a");
logout_link.setAttribute('href', '/logout');
logout_link.innerHTML = 'Log out';
new_toolbar_item(logout_link);


// create a fake link to hold the time string so formatting works
var clock_field = document.createElement("a");
clock_field.setAttribute('id', 'clock');
clock_field.innerHTML = '--:--:--';
new_toolbar_item(clock_field);


function update_clock() {

	// some auxiliary functions...
	function pad(number, len, forcesign) {
		var str = '' + number;
		if(forcesign && str.substr(0, 1) != '-') str = "+" + str;
		while (str.length < len) str = '0' + str;
		return str;
	}
	function timestr(d) {
		return '' +
			pad(d.getHours(), 2, false) + ':' +
			pad(d.getMinutes(), 2, false) + ':' +
			pad(d.getSeconds(), 2, false);
	}
	function datestr(d) {
		var monthnames = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		return '' +
			d.getDate() + ' ' +
			monthnames[d.getMonth()]; /* + ' ' +
			d.getFullYear();*/
	}

	function startswith(haystack, needle) {
		return( haystack.substr(0, needle.length) == needle );
	}

	// get current time
	d = new Date();

	// convert to UTC time in seconds
	utc = d.getTime()/1000 + (d.getTimezoneOffset() * 60);

	// convert to MIT time
	nd = new Date((utc + timezone_offset)*1000);

	// format strings 
	var clockstr = timestr(nd);
	var tooltipstr = "MIT time: " + timestr(nd) + ', ' + datestr(nd) + " / " +
		"Local time: " + timestr(d) + ', ' + datestr(d);

	// find the clock element and update the strings
	var clock = document.getElementById('clock')
	clock.innerHTML = clockstr;
	clock.alt = tooltipstr;
	clock.title = tooltipstr;


}


// get a precise offset!
function calibrate_clock() {
	console.log("Calibrating clock against json-time.appspot.com timeserver");
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://json-time.appspot.com/time.json?tz="+timezone,
		onload: function(xhr) {
			console.log("> old: " + timezone_offset);

			var data = eval("(" + xhr.responseText + ")");
			console.log(data);
			var md = data.datetime.split(' ');
			var offs = parseInt(md[md.length-1], 10);

			timezone_offset = ((offs/100) | 0) * 60 + (offs % 100);
			timezone_offset *= 60;
			console.log("> TZ offset from UTC: " + timezone_offset + " minutes");

			var d = new Date();
			var nd = new Date(data.datetime);
			offs = (d.getTime() - nd.getTime()) / 1000;
			console.log("> Clock difference: " + offs + " seconds");
			timezone_offset -= offs;

			console.log("> new: " + timezone_offset);
		}
	});
}



// take an educated guess on the offset in case calibration doesn't come up with a better idea
timezone_offset = -4 * 3600;


update_clock();
calibrate_clock();

// update clock display every second
setInterval(update_clock, 1000);

// recalibrate clock every 10 minutes
setInterval(update_clock, 10*60*1000);


