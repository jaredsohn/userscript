// ==UserScript==
// @name Last.fm play statistics! 1.2f
// @namespace http://code.google.com/p/lastfm-gm-scripts/
// @description Displays a statistic after the number of played tracks on Last.fm. Version 1.2f
// @include http://www.last.fm/user/*
// @include http://beta.last.fm/user/*
// ==/UserScript==

// arvid seems to be unavailable, so I fixed the script and published it under a new name.
// david@vidmar.net
// http://www.vidmar.net/

//This is a complete rewrite of http://www.greasemonkeyed.com/scripts/show/931 in order to make it work with
//Last.fm
//- arvid.jakobsson@gmail.com

/*

Changelog:

[M Lenzen - LucidCognition]

2006-12-30 1.2f
* Changed to correctly parse tracks played on profiles that are reset.

2006-12-29 1.2f
* Updated parsing of tracksplayed to work with the latest last.fm update.

[Dennis Burke - theboinkbaron]

2006-09-23
* Changes to work with last.fm's new css layout
* I rewrote some of the functions to be more accurate. It used to calculate everything by multiplying each
successive statistic by the factor difference between them. It now calculates the difference in time and
multiplies out to give the correct stats. Call me crazy but this works better. Oh, and I also added an
average per year.

[Stephen Paulger]

2005-12-01 1.2e
* Rewrite due to HTML change, also I made the registration date match() less specific to allow the script to work
on pages of users who are subscribers, staff, moderators etc.

[David]

2005-09-28 1.2d
* I fixed the script to work with last.fm again. arvid seems unavailable available.

[arvid]

2005-08-26 1.2
* Due to a change in the HTML of last.fm which milk pointed out (thanks!), the script stopped working. Changed it to work again.

2005-08-17 1.1
* Some code clean up, removed unnecessary GM_logs etc
* Changed the code in accordance to milks suggestions (http://www.userscripts.org/people/327). Thanks for the suggestions!
The script works better now when you've got more than zero posts in the forum.

2005-08-14 1.0
* Initial version

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson arvid.jakobsson@gmail.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

function xpath(query, context) {
	return document.evaluate(query, context, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var panel = document.getElementById("aboutMe");

if (panel.innerHTML.match(/\(reset on (.*)\)/)) {
	var reg_date = panel.innerHTML.match(/\(reset on (.*)\)/)[1];
	var tracksplayed = panel.innerHTML.match(/Tracks reset:<\/strong><\/span> ([0-9,]+)<br/)[1].replace(/,/, "");
}
else {
	var reg_date = panel.innerHTML.match(/Registered:<\/strong>(.*)/)[1];
	var tracksplayed = panel.innerHTML.match(/<\/strong>\W+([0-9,]+)<\/span>/)[1].replace(/,/, "");
}
var reg_date_ms = Date.parse(reg_date);
var now = new Date();
var diff = Math.round(now - reg_date_ms)/1000; //Sounds like this reg_date_ms variable is in milliseconds, so we divide by 1000 to give actual diff.


var hours = diff / (60*60);
var days = diff / (60*60*24);
var weeks = diff / (60*60*24*7);
var months = diff / (60*60*24*31);
var years = diff / (60*60*24*365);


var tracks_per_hour = tracksplayed / hours;
var tracks_per_day = tracksplayed / days;
var tracks_per_week = tracksplayed / weeks;
var tracks_per_month = tracksplayed / months;
var tracks_per_year = tracksplayed / years;
var tph = Math.round(tracks_per_hour*1000)/1000;
var tpd = Math.round(tracks_per_day*1000)/1000;
var tpw = Math.round(tracks_per_week*1000)/1000;
var tpm = Math.round(tracks_per_month*1000)/1000;
var tpy = Math.round(tracks_per_year);


var paragraphs = xpath(".//DIV[@class='c']/P", panel);
for (var i = 0; i < paragraphs.snapshotLength; i++) {
	var paragraph = paragraphs.snapshotItem(i);
	if (paragraph.innerHTML.match(/Tracks played:/)) {
		var p = new Array();
		p[0] = document.createElement("span");
		p[0].innerHTML = "<strong class=\"lfmlight\">Tracks per year:</strong> " + tpy + " <br /> ";
		p[1] = document.createElement("span");
		p[1].innerHTML = "<strong class=\"lfmlight\">Tracks per month:</strong> " + tpm.toFixed(3) + " <br /> ";
		p[2] = document.createElement("span");
		p[2].innerHTML = "<strong class=\"lfmlight\">Tracks per week:</strong> " + tpw.toFixed(3) + " <br /> ";
		p[3] = document.createElement("span");
		p[3].innerHTML = "<strong class=\"lfmlight\">Tracks per day:</strong> " + tpd.toFixed(3) + " <br /> ";
		p[4] = document.createElement("span");
		p[4].innerHTML = "<strong class=\"lfmlight\">Tracks per hour:</strong> " + tph.toFixed(3) + " <br /> ";

		for (var ii = 0; ii < 5; ii++) {
			paragraph.insertBefore(p[ii], paragraph.childNodes[4]);
		}
	}
}

