// ==UserScript==
// @name          Weather Underground Ajaxifier
// @namespace     http://www.callum-macdonald.com/code/
// @description   AJAXifies weather maps on weather underground. Use the drop down to select a different timezone and the map will change on the fly, no need to reload the page. Prev / Next links work as normal.
// @include       http://*wunderground.com/ndfdimage/viewimage*
// @author         Callum Macdonald
// @copyright      2009 by Callum Macdonald
// @license        GPL v3+
// @version        0.5
// @lastupdated    2009-11-26
// ==/UserScript==

// This script fires on the http://www.wunderground.com/ndfdimage/viewimage page
// Choosing a new timezone from the drop down will load a new map dynamically,
// without reloading the whole page. Use the up / down arrow keys to scroll
// through the maps quickly.

var chmMonths = {'Jan':0, 'Feb':1, 'Mar':2, 'Apr':3, 'May':4, 'Jun':5, 'Jul':6, 'Aug':7, 'Sep':8, 'Oct':9, 'Nov':10, 'Dec':11};
var chmOrigImage = '';
var chmPrevImage = '';
var chmMap = document.getElementById('WXMAP');

function chmTextToImage(chmCurrentMap) {
	var chmParts = chmCurrentMap.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ([0-3]?[0-9]{1}) - ([1-2]?[1-9]{1}):([0-9]{2}) ([AP]M) GMT/);

	var chmDate = new Date();

	chmDate.setUTCMonth(chmMonths[chmParts[2]]);
	chmDate.setUTCDate(chmParts[3]);

	var chmHours = parseInt(chmParts[4]);

	if (chmHours == 12 && chmParts[6] == 'AM') { chmHours = 0; }
	if (chmHours != 12 && chmParts[6] == 'PM') { chmHours += 12; }

	chmDate.setUTCHours(chmHours);
	chmDate.setUTCMinutes(chmParts[5]);
	chmDate.setUTCSeconds(0);
	
	var chmY = String(chmDate.getUTCFullYear());
	var chmM = String(chmDate.getUTCMonth()+1); // Add 1 for human readable month
	var chmD = String(chmDate.getUTCDate());
	if (chmD.length == 1) { chmD = '0' + chmD; }
	var chmH = String(chmDate.getUTCHours());
	if (chmH.length == 1) { chmH = '0' + chmH; }
	var chmi = String(chmDate.getUTCMinutes());
	if (chmi.length == 1) { chmi = '0' + chmi; }

	return(chmY + chmM + chmD + chmH + chmi);
}

function chmChangeImage(chmNewImage) {
	if (typeof(chmMap) == 'undefined') {
		var chmMap = document.getElementById('WXMAP');
	}
	
	chmMap.src = chmMap.src.replace(chmPrevImage, chmNewImage);
	chmPrevImage = chmNewImage;
}

function chmMsgChange () {
	// Get the current message and convert it
	var chmNewMsg = this[this.selectedIndex].text;
	var chmNewImage = chmTextToImage(chmNewMsg);
	chmChangeImage(chmNewImage);
}

var chmMsg = document.getElementsByName('msg');
// Unset the onchange event using .wrappedJSObject
chmMsg[0].wrappedJSObject.onchange = null;

chmMsg[0].addEventListener('change', chmMsgChange, true);
chmMsg[0].addEventListener('keyup', chmMsgChange, true);
chmOrigImage = chmTextToImage(chmMsg[0][chmMsg[0].selectedIndex].text);
chmPrevImage = chmOrigImage;
