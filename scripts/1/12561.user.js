// ==UserScript==
// @name           FB Mafia Active Timer
// @namespace      coolguy5678.biaklan.com
// @description    Makes the timer count down without refreshing.
// @include        http://apps.facebook.com/themafia/games/show/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) ;
}

function toStringLeadingZero(number) {
	// Convert a number to a string, ensuring that there's two digits
	var str = number.toString();

	if (str.length == 1) {
		str = "0" + str;
	}
	return str ;
}

window.stepFBMATimer = function() {
	
	var title = xpath("//h1/span").snapshotItem(0) ;
	var string = title.innerHTML ;
	
	// Don't do this if game has ended or game hasn't started yet
	if (string.indexOf("Win") != -1 || string.indexOf("/") != -1) return ;
	
	// Parse out each section
	// without the base 10 specified, "08" is read as octal >:-|
	var hours = parseInt(string.slice(0, 2), 10) ;
	var mins = parseInt(string.slice(3, 5), 10) ;
	var seconds = parseInt(string.slice(6, 8), 10) ;
	var totalSeconds = hours*3600 + mins*60 + seconds ;
	
	// Find each new section
	totalSeconds-- ;
	var newHours = Math.floor(totalSeconds / 3600) ;
	var newMins = Math.floor((totalSeconds % 3600) / 60) ;
	var newSeconds = Math.floor(totalSeconds % 60) ;
	
	if (totalSeconds <= 5) title.style.color = "red" ;
	
	// Build the string again
	var newString = "" ;
	newString += toStringLeadingZero(newHours) + ":" ;
	newString += toStringLeadingZero(newMins) + ":" ;
	newString += toStringLeadingZero(newSeconds) ;
	newString += string.slice(8) ;
	
	title.innerHTML = newString ;
	if (totalSeconds <= 0) return ;
	
	// Make sure the function is called again after another second
	window.setTimeout(window.stepFBMATimer, 1000) ;
}

// Start the timer going
window.setTimeout(window.stepFBMATimer, 1000) ;