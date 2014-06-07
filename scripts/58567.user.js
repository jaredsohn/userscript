// hi.is viðburðir
// Sept 2009
// Copyright (c) 2009, Tryggvi Hjörvar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "hi_events", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          hi_events
// @namespace     http://www.seidur.is
// @description   Adds event from hi.is to google calendar - Bætir viðburði af hi.is inn í google calendar
// @include       http://www.hi.is/is/vidburdir/*
// ==/UserScript==

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function leftPad(n, totalDigits) { 
    n = n.toString(); 
    var pd = ''; 
    if (totalDigits > n.length) { 
        for (i=0; i < (totalDigits-n.length); i++) { 
            pd += '0'; 
        } 
    } 
    return pd + n.toString(); 
} 

//Get event title from DOM
contentDiv = document.getElementById('chooseContent').getElementsByClassName('middlePart')[0];
title = contentDiv.getElementsByTagName('h1')[0].innerHTML;

//Get the start and end times from the DOM
startDiv = document.getElementsByClassName('event-start')[0];
startTime = startDiv.innerHTML.replace(/<label>.*<\/label>/,'');
endDiv = document.getElementsByClassName('event-end')[0];
endTime = endDiv.innerHTML.replace(/<label>.*<\/label>/,'');

//Format dates string: dates=20060415T180000Z/20060415T190000Z
start_date = startTime.substr(0,2);
start_month = startTime.substr(3,2);
start_year = startTime.substr(6,4);
start_hour = startTime.substr(13,2);
start_minute = startTime.substr(16,2);

end_date = endTime.substr(0,2);
end_month = endTime.substr(3,2);
end_year = endTime.substr(6,4);
end_hour = endTime.substr(13,2);
end_minute = endTime.substr(16,2);

dates = start_year + start_month + start_date + 'T' + start_hour + start_minute + '00Z';
dates += '/' + end_year + end_month + end_date + 'T' + end_hour + end_minute + '00Z';

//Get location from DOM
locationDiv = contentDiv.getElementsByClassName('field field-type-nodereference field-field-stasetning')[0];
if(locationDiv){
	location = locationDiv.firstChild.firstChild.childNodes[1].innerHTML;
}
else
	location = '';
location_detailDiv = contentDiv.getElementsByClassName('field field-type-text field-field-nnur-stasetning')[0];
if(location_detailDiv) {
	location_detail = location_detailDiv.firstChild.firstChild.innerHTML;
	location_detail  = location_detail.replace(/<div.*<\/div>/,'');
}
else
	location_detail = '';


//Add "Add to Google Calendar" link
a_AddToGoogle = document.createElement('a');
a_AddToGoogle.href = 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + title 
					+ '&dates=' + dates;
					+ '&location=' + location + ' - ' + location_detail
					+ '&trp=true'
					+ '&sprop=www.hi.is&sprop:Háskóli Íslands';
a_AddToGoogle.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://www.google.com/calendar/images/ext/gc_button1.gif">';

startDiv.insertBefore(a_AddToGoogle, startDiv.nextSibling);
