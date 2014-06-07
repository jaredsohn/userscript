// ==UserScript==
// @name           eBay Counter
// @namespace      http://stuarttaylor.org
// @description    eBay Counter
// @include        http://*.ebay.*
// ==/UserScript==

// Version 1.0 by Stuart Taylor (stuarttaylor79 at googlemail.com)
// This is my first Greasemonkey script. Please be gentle.

const add_element = true
const ebaycountdown_id = 'live_countdown'
const second = 1
const minute = second * 60
const hour = minute * 60
const day = hour * 24

var newElement, secondsleft, target;
var endtime = document.getElementById('DetailsTimeLeft');

// Fetch local time
var d = new Date()
var myTime = d.getTime()

function countdown(){
	var timer = 1 // Seconds before countdown refresh
	
	// Reduce the time remaining
	time = --secondsleft
	// Calculate hours
	h =  parseInt(time / 60 / 60)
	newtime = time - (60 * 60 * h)
	// Calculate minutes
	m = parseInt(newtime / 60)
	newtime = newtime - (60 * m)
	// Calculate seconds
	s = newtime
	
	// Prefix & Suffix for the countdown timer text
	// i.e Information, HTML tags, etc
	var msg_prefix = '<b>'
	var msg_suffix = '</b>'
	
	// Message to report once the countdown has finished
	// Overwrites the prefix & suffix text
	var end_msg = '<b>Finished</b>'

	if (secondsleft > 0) {
		var t = msg_prefix
		if (h>0) {t += h + pluralize(h, ' hour ', ' hours ')}
		if (m>0) {t += m + pluralize(m, ' min ', ' mins ')}
		if (s>=0) {t +=s + pluralize(s, ' sec ', ' secs ')}
		t += ' ' + msg_suffix
	}
	else {
		var t = end_msg
	}
	
	// Refresh the page to recalibrate the timer with eBay time
	// Auction time <24hrs
	if (h == 22 && m == 59 && s == 59) {
		window.location.reload()
	}
	// Auction time <30mins
	if (h < 0 && m == 29 && s == 0) {
		window.location.reload()
	}
	// Auction time <10mins
	if (h < 0 && m == 10 && s == 0) {
		window.location.reload()
	}
	
	// Update the countdown if the auction is less than 24hrs old only
	if (h < 24) {
		// If the new element has been added, update the countdown message
		if (add_element) {
			document.getElementById(ebaycountdown_id).innerHTML = t + ' (approximately)'
		}
		// Or replace the ebay counter
		else {
			endtime.innerHTML = t + ' approx. ' + target
		}
	}
	
	// Refresh countdown if there are seconds remaining
	window.setTimeout(countdown, timer * 1000)
}

function pluralize(count, single, multiple) {
	if (count == 1) {
		return single;
	}
	else {
		return multiple;
	}
}

function parse_eoa(endtime) {
	var eoa = new Array()
	// Fetch the Date
	pos1 = endtime.innerHTML.search(/\d{1,2}\-[A-Za-z]*\-\d{1,2}/)
	pos2 = endtime.innerHTML.search(/\-\d{2}/) + 3
	eoa[0] = endtime.innerHTML.substring(pos1,pos2)

	// Fetch the Time
	pos1 = endtime.innerHTML.search(/\d\d:/)
	pos2 = endtime.innerHTML.search(/\s[A-Z]{3,4}/)
	eoa[1] = endtime.innerHTML.substring(pos1,pos2)

	// Fetch the Timezone
	tz = endtime.innerHTML.match(/[A-Z]{3,4}/)
	eoa[2] = tz

	// Fetch the Days remaining
	pos1 = endtime.innerHTML.search(/[0-9]{1,2}\sday/)
	pos2 = endtime.innerHTML.search(/\sday/)
	eoa[3] = endtime.innerHTML.substring(pos1,pos2)

	// Fetch the Hours remaining
	pos1 = endtime.innerHTML.search(/[0-9]{1,2}\shour/)
	pos2 = endtime.innerHTML.search(/\shour/)
	eoa[4] = endtime.innerHTML.substring(pos1,pos2)

	// Fetch the Minutes remaining
	pos1 = endtime.innerHTML.search(/[0-9]{1,2}\smin/)
	pos2 = endtime.innerHTML.search(/\smin/)
	eoa[5] = endtime.innerHTML.substring(pos1,pos2)

	// Fetch the Seconds remaining
	pos1 = endtime.innerHTML.search(/[0-9]{1,2}\ssec/)
	pos2 = endtime.innerHTML.search(/\ssec/)
	eoa[6] = endtime.innerHTML.substring(pos1,pos2)

	return eoa
}

function timeleft(eoa_array) {
	s = eoa_array[6] * second
	m = eoa_array[5] * minute
	h = eoa_array[4] * hour
	d = eoa_array[3] * day
	
	seconds = (d + h + m + s)
	
	// TODO: Check for 0 seconds, and if the auction has finished
	
	return seconds
}

// if DetailsTimeLeft element exists
if (endtime) {
	var target = endtime.innerHTML.match(/\(.*\)/)
	if (add_element) {
		newElement = document.createElement('div');
	    endtime.parentNode.insertBefore(newElement, endtime.nextSibling);
		newElement.id = ebaycountdown_id
	}
	
	// Parse the DetailsTimeLeft element inner HTML, and
	// extract all the key data into an array
	eoa_array = parse_eoa(endtime)
	
	// Calculate the number of seconds remaining
	secondsleft = timeleft(eoa_array)
	
	// Start the countdown
	countdown();
}