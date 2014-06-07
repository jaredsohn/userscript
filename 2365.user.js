// ==UserScript==
// @name		Last.fm - Percentage
// @version		2.2.0
// @namespace	http://code.google.com/p/lastfm-gm-scripts/	
// @description	Display percentage statistics on user profile
// @identifier  http://lastfm-gm-scripts.googlecode.com/svn/trunk/lastfmpercentage.user.js
// @include		http://www.last.fm/user/*
// @include		http://beta.last.fm/user/*
// @include		http://last.fm/user/*
// ==/UserScript==

var SCRIPT = {
	name: "Last.fm - Percentage",
	namespace: "http://code.google.com/p/lastfm-gm-scripts/",
	description: "Display percentage statistics on user profile",
	identifier: "http://lastfm-gm-scripts.googlecode.com/svn/trunk/lastfmpercentage.user.js",
	source: "http://code.google.com/p/lastfm-fm-scripts/",
	version: "2.2.0",
	date: (new Date(2007, 3 - 1, 31)).valueOf()
};

/* CHANGELOG

2007-03-31 * 2.2.0
	All weekly charts now use the number of tracks played that week to calc percentages.
* 2.1.11
	Use JS built in toFixed function to format numbers.
	Change font color by changing style info instead of adding font tags.
2007-03-29 * 2.1.10
	Finally got auto updates working, removed all the point release changelog between this and 2.1.0
* 2.1.0
	Added automatic updates.
2007-03-28 * 2.0
	Moved a bunch of the code around.  Now the number of decimal places can be set from the User Script Commands/
2006-12-29 
	Modified to work with the latest last.fm changes
	-m.lenzen@gmail.com
2005-12-16 * _ml
	Added decimal place.
	-m.lenzen@gmail.com
2005-08-14 * 1.0
	Initial version
	This is a complete rewrite of http://www.userscripts.org/scripts/show/693  in order to make it work with Last.fm
	arvid.jakobsson@gmail.com

*/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

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

// check for updates
try {
	window.addEventListener("load", function () { try {
		(unsafeWindow || window.wrappedJSObject || window)
				.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
	} catch (ex) {} }, false);
} catch (ex) {}

function promptForDecPlaces() {
	GM_setValue("num_dec", prompt("How many decimal places to display?", getDecPlaces()));
	document.location.reload();
}

function promptForFontColor(color) {
	GM_setValue("fontColor", prompt("Enter a color (eg. '#333' or 'black')", getFontColor()));
	document.location.reload();
}

function getFontColor() { return GM_getValue("fontColor", "#333"); }
function getDecPlaces() { return GM_getValue("num_dec", 1); }

function xpath(query) {
	return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getTracksPlayedTotal(avatarPanel) {
	return avatarPanel.innerHTML.match(/<\/strong>\W+<span class="nowrap">([0-9,]+)<\/span>/)[1].replace(/,/, "");
}

function getTracksPlayedLastWeek() {
	var cachedChartEnd = GM_getValue(user + "-weeklyChartEnd");
	var now = new Date()/1000;
	if(!cachedChartEnd || now-cachedChartEnd > 7*24*60*60) 
		parseTracksPlayedLastWeek();
	return GM_getValue(user + "-weeklyTracksPlayed");
}

function parseTracksPlayedLastWeek() {
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://ws.audioscrobbler.com/1.0/user/' + user + '/weeklyartistchart.xml',
		onload: function(details) {
			var xmlDoc = new DOMParser().parseFromString(details.responseText, "application/xml");
			var tracksPlayedLastWeek = 0;
			var playcounts = xmlDoc.getElementsByTagName('playcount');
			for(i = 0; i < playcounts.length; i++) {
				tracksPlayedLastWeek = tracksPlayedLastWeek + 1*playcounts[i].textContent;
			}
			var end = xmlDoc.getElementsByTagName("weeklyartistchart")[0].getAttribute("to");
			GM_setValue(user + "-weeklyTracksPlayed", tracksPlayedLastWeek);
			GM_setValue(user + "-weeklyChartEnd", end);
		}
	});
}

addGlobalStyle("table.barChart td.quantifier {color: " + getFontColor() + " ! important;}");

GM_registerMenuCommand("Set Number of Decimal Places", promptForDecPlaces);
GM_registerMenuCommand("Set Percentage Font Color", promptForFontColor);

var user = location.href.match(/http:\/\/.*?\/user\/([^\/]+)/)[1];
var avatarPanel = document.getElementById("avatarPanel");
var tracksPlayed = getTracksPlayedTotal(avatarPanel);
var tracksPlayedLastWeek = getTracksPlayedLastWeek();
if (!tracksPlayed || !tracksPlayedLastWeek)
	return;

var barCharts = xpath("//table[@class='barChart']");
GM_log('' + barCharts.length);

var bars = xpath("//TD[@class='quantifier']/DIV/SPAN");

for (var i = 0; i < bars.snapshotLength; i++) {
	var ratio;
	var bar = bars.snapshotItem(i)
	var played = bar.innerHTML.replace(/,/, "");
	if(/charttype=weekly/.test(location.href) 
			|| location.href == 'http://www.last.fm/user/' + user + '/charts/'
			|| bar.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("id") == "weeklychart") {
		ratio = played / tracksPlayedLastWeek;
	} else {
		GM_log(bar.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("id"));
		ratio = played / tracksPlayed;
	}
	var percentage = (100*ratio).toFixed(getDecPlaces());
	if (percentage > 0)
		bar.innerHTML = bar.innerHTML + " (" + percentage + "%)";
}
