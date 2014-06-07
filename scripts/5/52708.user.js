// ==UserScript==
// @name           Geburtstage exportieren für StudiVZ, SchuelerVZ & MeinVZ 1.03
// @namespace      http://userscripts.org/scripts/show/52708
// @description    Ermoeglicht es die Geburtstage von Freunden als iCal-Datei zu exportieren.
// @include        http://www.studivz.net/*
// @include        http://www.meinvz.net/*
// @include        http://www.schuelervz.net/*
// ==/UserScript==
//
// By: Martin Pietschmann 'Schirkan'
// Email: schirkan86@gmx.de
// Last Update:  02.07.2009

(function() {
	
if (self != top) { return; } // Don't run in frames

var ical_img = '<img style="margin-bottom:-3px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHjaYvz//z8DJYARRCzYsuk/iAU2CkQwAon/jAyMUBpixX+IYkaIxgRvf0aQ5SxzN679f4bXiWSb525YC7aK5ffP3wzz931gSPEVAFnGMO8GN0OS5leGWVv+4dTM9OsnQ5/+bzCb5c/vXwx//4oyzNwAk/7FMOs6K17b/zGwM/z5+QtqwM8fDN+a2Ej2wqQFPyEG/IaaxAgKRKQI2X38HE7NrpZGDL9+Qgxg+g1k/ANq/AvE/5AwCLhZGTGI79vD4FZVxGCak8bg9vQuxAtAeZDLwS4AmfTnLwPDwdOYNu46do7BdN0qhtPJ6WC+SnsnA8OUWWD1v5Fd8AdqJchGbLSpjhqYFuTjAdMg9b+QAxFkIsxGdFo8KIyBobCYQQXIvwhigwwAuwDiBSZQNP7+j9sFL51cGATPnWE4DXS6dGEJg5G+AVj931+wdABk/MXjAmQapg4Efv+GeeHPb3Co6mgbwJI57gSEFM1//0Bd8A/ooeaKdPJzI6XZGSDAAArcz3WeOBx6AAAAAElFTkSuQmCC" width="16" height="16">';

function parse_date(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('morgen')!=-1) { date.setDate( date.getDate()+1 ); }
	else if (str.indexOf('heute')==-1) {
		if (m = str.match(/\s(\d+)\s/)) { date.setDate( date.getDate() + parseInt(m[1]) ); }
		if (m = str.match(/(\d+)\.(\d+)\.(\d+)/)) {
			date.setDate(m[1]);
			date.setMonth(m[2]-1);
			date.setYear(m[3]);
		}else if (m = str.match(/(\d+)\.(\d+)/)) {
			date.setDate(m[1]);
			date.setMonth(m[2]-1);
		}
	}
	return date;
}

function generate_ical_date(date) {
	var month = date.getMonth()+1;
	if (month<10) { month = '0' + month; }
	var day = date.getDate();
	if (day<10) { day = '0' + day; }
	return '' + date.getFullYear() + month + day;
}

function generate_ical_event(date, text) {
	var now = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	if (month <= now.getMonth()+1 && day < now.getDate()) date.setYear(now.getFullYear() + 1);
	else date.setYear(now.getFullYear());
	var datum_start = generate_ical_date(date);
	date.setDate(day+1);
	var datum_end = generate_ical_date(date);
	var datum_now = generate_ical_date(now);
	
	var ical = 'BEGIN:VEVENT%0D%0A';
	ical += 'SUMMARY:' + text + '%0D%0A';
	ical += 'DESCRIPTION:Geburtstag von ' + text + /* ': ' + day + '.' + month + '.' + year + */ '%0D%0A';
	ical += 'DTSTART;VALUE=DATE:' + datum_start + '%0D%0A';
	ical += 'DTEND;VALUE=DATE:' + datum_end + '%0D%0A';
	ical += 'DTSTAMP:' + datum_now + 'T120000Z%0D%0A';
	ical += 'RRULE:FREQ=YEARLY;BYMONTHDAY=' + day + ';BYMONTH=' + month + '%0D%0A';
	ical += 'UID:' + text + '%0D%0A';
	ical += 'END:VEVENT%0D%0A';
	return ical;
}

function ical_export(events) {
	var ical = 'BEGIN:VCALENDAR%0D%0A';
	ical += 'PRODID:StudiVZ Geburtstagskalender%0D%0A';
	ical += 'VERSION:2.0%0D%0A';
	ical += 'METHOD:PUBLISH%0D%0A';
	for (var i=0; i<events.length; i++) {
		ical += events[i];
	}
	return ical + 'END:VCALENDAR';
}

if(location.href.indexOf("/Profile/") != -1) { // Profilseite
	// erzeugt einen Link um einen einzelnen Geburtstag zu exportieren
	if((e = document.getElementById('Mod-Profile-Information-General')) != undefined) {
		dt = e.getElementsByTagName('dt');
		for(var i=0; i<dt.length; i++) {
			if(dt[i].innerHTML == 'Geburtstag:') {
				var ical_link = document.createElement('a');
				ical_link.href = '#';
				ical_link.title = 'iCal export';
				ical_link.innerHTML = ical_img;
				ical_link.addEventListener('click', function(e) {
					var bday = parse_date( this.parentNode.innerHTML );
					var name = document.getElementById('profileImage').alt;
					this.href = 'data:text/calendar;charset=US-ASCII,' + ical_export(generate_ical_event(bday, name));
					this.onclick='';
				}, false);
				dt[i].nextElementSibling.appendChild(ical_link);
				break;
			}
		}
	}
} else if(location.href.indexOf("/Start") != -1) { // Startseite
	var divs = document.getElementsByTagName('div');
	for(i=0; i<divs.length; i++) {
		// erzeugt einen Link zum exportieren der kommenden Geburtstage
		if(divs[i].className == 'float-left') {
			var ical_link = document.createElement('a');
			ical_link.href = '#';
			ical_link.title = 'iCal export';
			ical_link.innerHTML = ical_img;
			ical_link.addEventListener('click', function(e) {
				var bday = parse_date( this.nextElementSibling.nextSibling.nodeValue );
				var name = this.nextElementSibling.title;
				this.href = 'data:text/calendar;charset=US-ASCII,' + ical_export(generate_ical_event(bday, name));
				this.onclick='';
			}, false);
			divs[i].insertBefore(ical_link, divs[i].firstChild);
		}
	}
}

}) ();