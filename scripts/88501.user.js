// ==UserScript==
// @name           New Torrents Marker
// @namespace      New Torrents Marker
// @description    Marks new torrents since last visit
// @version        1.0.1
// @include        http://www.torrentbytes.net/browse*
// @include        https://www.torrentbytes.net/browse*
// @include        http://www.torrentleech.org/browse*
// @include        http://scenehd.org/browse*
// @include        https://scenehd.org/browse*
// ==/UserScript==

var domain = location.hostname.match('([^\.]+)\.(be|biz|ca|com|de|eu|gr|in|info|it|me|name|net|no|org|pl|ro|ru|su|to|ua|us)$');
var strGMValueName = domain[0]

// SETTINGS START

// String to mark new torrents
var strInsert = "<div style='float:right;padding-top:4px;font-style:italic;font-weight:bold;font-size:12px;color:red;'>NEW</div>";
// In what <td> to insert the above string, relative to which <td> date is found in.
var strInsertWhere = -3;
// Difference in seconds between local time and site time.
var strTimeDiff = 0;
// Start search at this <TD>, to stop false catches in header etc.
var strFirstTD = 25;
// Set this to true to stop marking at first page, otherwise it will keep marking until the last NEW is found.
var updateVisit = false;
// Add a "catchup" button in the bottom right corner.
// Useful if 'updateVisit = false' and you have several pages of NEW to read, but you don't want to.
var catchupButton = true;
// Only update visit with Catchup Button, useful when debugging
var catchupForce = true;
// Regex to find date + time.
var reDates = new RegExp("([0-9]{4}-[0-9]{2}-[0-9]{2}).*([0-9]{2}:[0-9]{2}:[0-9]{2})");

// Site specific settings. You can add the above settings here.
if (domain) {
    switch (domain[0]) {
        case 'torrentbytes.net':
			strInsertWhere = -3;
			strTimeDiff = -3600;
			strFirstTD = 60;
		break;
        case 'torrentleech.org':
			strInsertWhere = 0;
			strTimeDiff = +3600;
			strFirstTD = 35;
		break;
        case 'scenehd.org':
			strInsertWhere = -6;
			strTimeDiff = 0;
			strFirstTD = 50;
		break;
	}
}
// SETTINGS END

var lastVisit = GM_getValue(strGMValueName, false);
if(lastVisit.length == 13) {
	var strDates = document.getElementsByTagName('td');
	for (i = strFirstTD; i < strDates.length; ++i) {
		var reMatch = reDates.exec(strDates[i].innerHTML);
		if (reMatch) {
			strTime=new Date(reMatch[1]).toDateString();
			strTime=new Date(strTime + ", " + reMatch[2]).getTime();
			strTime = strTime + (strTimeDiff * 1000);
			// alert(i + " --- " + reMatch[1] + " " + reMatch[2] + " --- " + parseInt(strTime) +" --- "+ parseInt(lastVisit));
			if(parseInt(strTime) > parseInt(lastVisit)) {
				strDates[i + strInsertWhere].innerHTML = strInsert + strDates[i + strInsertWhere].innerHTML;
			} else {
				updateVisit=true;
				break;
			}
		}
	}
} else {
	updateVisit=true;
}

if(catchupForce) {
	catchupButton=true;
	updateVisit=false;
}

if(catchupButton && !updateVisit) {
	var cb = document.createElement("div");
	cb.innerHTML = '<div style="position: fixed; bottom: 10px; right: 10px; ' +
    'border: 1px dashed #000000; background-color: #ff0000; padding:5px;' +
    'color: #ffffff; cursor: pointer;">MARK AS READ</div>';
	document.body.insertBefore(cb, document.body.firstChild);
	cb.addEventListener ("click", function() {doUpdateVisit(); cb.style.visibility="hidden";}, false);
}

if(updateVisit) {
	doUpdateVisit();
}

function doUpdateVisit() {
	var d=new Date().getTime();
	GM_setValue(strGMValueName, ""+d+"");
}