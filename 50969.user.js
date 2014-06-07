/*
    deviantSave
    Chris Wood, email: userscripts at gracefool.com
    
    Public Domain - Copy, use, modify, spread...
*/

// ==UserScript==
// @name          deviantSave
// @namespace     http://gracefool.com
// @description	  On deviation pages at deviantART, this script replaces the copyright notice with a custom title for saving images
// @include       http://*.deviantart.com/art/*
// ==/UserScript==

//Get the filename extension
//var ext = document.getElementById("zoomed-in-image").getAttribute("src");
//ext = ext.replace(/.*\.([^\.]*)$/, '$1');

//Get the title of the piece
var elements = document.evaluate(
    "//div[@id='deviation']//div//div//h1",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (elements.snapshotItem(0) != null) {
var title = elements.snapshotItem(0).textContent;

//remove ' by' and replace usertag with ~
title = title.replace(/^(.+)( +)(by (~|\*|=|`|\°|\#|@|¢|\^|\$|!))/, '$1 ~');

//replace any : with -
title = title.replace(/:/, '-');
					
//remove enclosing quotes
title = title.replace(/^(\"|\')+/, '');
title = title.replace(/(\"|\')+ ~/, ' ~');

//Get metadata
elements = document.evaluate(
    "//div[@class='gr-body']//div[@class='gr']//div[@class='hh l ppp']//div[@class='details']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var details = elements.snapshotItem(0);
var date = details.innerHTML.match(/Submitted: <span.*>(.+) ([1-3]?[0-9])(, )([12][0-9]{3})/);

var year, month, day;
today = new Date();
//If it was recently submitted
if (date == null) {
	if(details.innerHTML.match(/Submitted: <span title=".+">.* ago<\/span>/)) {
		date = details.innerHTML.match(/Submitted: <span title="(.+) ([1-3]?[0-9])(, )([12][0-9]{3})">.*<\/span>/);
		//If it is not the new year
		if (date == null) {
			date = details.innerHTML.match(/Submitted: <span title="(.+) ([1-3]?[0-9])">.*<\/span>/);
		}
	} else {
		date = details.innerHTML.match(/Submitted: <span.*>(.+) ([1-3]?[0-9]).*<\/span>/);
	}
}
if (date == null) {
	alert("Unknown date format - please forward page source to deviantSave@gracefool.com");
}
if (date[4] == null) {
	//If there is no year, it is the current year
	year = today.getFullYear();
} else {
	year = date[4];
}

day = date[2];
//convert from d to dd
if (day.length == 1)
	day = "0" + date[2];

//convert from mmmm to mm
switch(date[1].substr(0,3).toLowerCase()) {
	case 'jan':
	month = '01';break;
	case 'feb':
	month = '02';break;
	case 'mar':
	month = '03';break;
	case 'apr':
	month = '04';break;
	case 'may':
	month = '05';break;
	case 'jun':
	month = '06';break;
	case 'jul':
	month = '07';break;
	case 'aug':
	month = '08';break;
	case 'sep':
	month = '09';break;
	case 'oct':
	month = '10';break;
	case 'nov':
	month = '11';break;
	case 'dec':
	month = '12';break;
}
var res = details.innerHTML.match(/(Resolution: )([0-9]+)(×)([0-9]+)/);
title = title + " [" + res[2] + "x" + res[4] + " " + year + month + day + "]";

//Replace copyright with new title
elements = document.evaluate(
    "//div[@class='pp c copy']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
elements.snapshotItem(0).innerHTML = title;
}