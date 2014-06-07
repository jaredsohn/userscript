// Last.fm play statistics! 1.2d

// ==UserScript==
// @name          Last.fm  play statistics!
// @namespace     tag:http://www.vidmar.net,2005-09-28:Last.fm-play-statistics-d.
// @description   Displays a statistic after the number of played tracks on Last.fm. Version 1.2d
// @include       http://www.last.fm/user/*
// ==/UserScript==

// arvid seems to be unavailable, so I fixed the script and published it under a new name.
// http://www.vidmar.net/

//This is a complete rewrite of http://www.greasemonkeyed.com/scripts/show/931  in order to make it work with
//Last.fm
//- arvid.jakobsson@gmail.com

/*

Changelog:

[David]

2005-09-28  1.2d
* I fixed the script to work with last.fm again. arvid seems unavailable available.

[arvid]

2005-08-26	1.2
* Due to a change in the HTML of last.fm which milk pointed out (thanks!), the script stopped working. Changed it to work again.

2005-08-17	1.1
* Some code clean up, removed unnecessary GM_logs etc
* Changed the code in accordance to milks suggestions (http://www.userscripts.org/people/327). Thanks for the suggestions!
The script works better now when you've got more than zero posts in the forum.
   
2005-08-14	1.0
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
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
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

var panel = document.getElementById("featurepanel");
var tracksplayed = panel.innerHTML.match(/<p><strong>Tracks played:<\/strong> ([0-9]+)<br>/)[1];
if (!tracksplayed)
	return;

var reg_date = panel.getElementsByTagName("p")[0].innerHTML.match(/Registered on (.*)/)[1];
var reg_date_ms = Date.parse(reg_date);
var now = new Date();

var hours = (now - reg_date_ms) / (60*1000*60);
var days = hours / 24;
var weeks = days / 7;

var tracks_per_hour = tracksplayed / hours;
var tracks_per_day = tracksplayed / days;
var tracks_per_week = tracksplayed / weeks;

var paragraphs = xpath("./DIV[@class='c']/P", panel);
for (var i = 0; i < paragraphs.snapshotLength; i++) {
	var paragraph = paragraphs.snapshotItem(i);
	if (paragraph.innerHTML.match(/Tracks played:/)) {
		var p = new Array();
		p[0] = document.createElement("span");
		p[0].innerHTML = "<strong>Tracks per week:</strong> " + Math.round(tracks_per_week*10)/10 + "<br />                                    ";
		p[1] = document.createElement("span");
		p[1].innerHTML = "<strong>Tracks per day:</strong> " + Math.round(tracks_per_day*10)/10 + "<br />                                    ";
		p[2] = document.createElement("span");
		p[2].innerHTML = "<strong>Tracks per hour:</strong> " + Math.round(tracks_per_hour*10)/10  + "<br />                                    ";
		
		for (var ii = 0; ii < 3; ii++) {
			paragraph.insertBefore(p[ii], paragraph.childNodes[3]);
		}
		
		break;
	}
}
