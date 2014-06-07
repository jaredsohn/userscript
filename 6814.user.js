// ==UserScript==
// @name Last.fm post statistics! 1.0
// @namespace http://userscripts.org/scripts/source/6814.user.js
// @description Displays a statistic after the number of posts posted on Last.fm. Version 1.0
// @include http://www.last.fm/user/*
// @include http://beta.last.fm/user/*
// ==/UserScript==


// This is a modified play statistics script.

/*

Changelog:

[Tom Rix - wdaltec]

2006-12-20 1.0
* Initial version (from modified play stats script)

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

var postsposted = panel.getElementsByTagName('p')[2].innerHTML.replace(',', '').split("\n")[11].replace(/^\s*|\s*$/g, "");

var reg_date = panel.innerHTML.match(/Registered:<\/strong>(.*)/)[1];
var reg_date_ms = Date.parse(reg_date);

var now = new Date();
var diff = Math.round(now - reg_date_ms)/1000; //Sounds like this reg_date_ms variable is in milliseconds, so we divide by 1000 to give actual diff.
var hours = diff / (60*60);
var days = diff / (60*60*24);
var weeks = diff / (60*60*24*7);
var months = diff / (60*60*24*31);
var years = diff / (60*60*24*365);

var posts_per_hour = postsposted / hours;
var posts_per_day = postsposted / days;
var posts_per_week = postsposted / weeks;
var posts_per_month = postsposted / months;
var posts_per_year = postsposted / years;
var tph = Math.round(posts_per_hour*1000)/1000;
var tpd = Math.round(posts_per_day*1000)/1000;
var tpw = Math.round(posts_per_week*1000)/1000;
var tpm = Math.round(posts_per_month*1000)/1000;
var tpy = Math.round(posts_per_year);


var paragraphs = xpath(".//DIV[@class='c']/P", panel);
for (var i = 0; i < paragraphs.snapshotLength; i++) {
var paragraph = paragraphs.snapshotItem(i);
if (paragraph.innerHTML.match(/Posts:/)) {
var p = new Array();
p[0] = document.createElement("span");
p[0].innerHTML = "<strong class=\"lfmlight\">Posts per year:</strong> " + tpy + " <br /> ";
p[1] = document.createElement("span");
p[1].innerHTML = "<strong class=\"lfmlight\">Posts per month:</strong> " + tpm.toFixed(3) + " <br /> ";
p[2] = document.createElement("span");
p[2].innerHTML = "<strong class=\"lfmlight\">Posts per week:</strong> " + tpw.toFixed(3) + " <br /> ";
p[3] = document.createElement("span");
p[3].innerHTML = "<strong class=\"lfmlight\">Posts per day:</strong> " + tpd.toFixed(3) + " <br /> ";
p[4] = document.createElement("span");
p[4].innerHTML = "<strong class=\"lfmlight\">Posts per hour:</strong> " + tph.toFixed(3) + " <br /> ";

if (paragraph.innerHTML.match(/Tracks per year/)) {
var insertionIndex = 15;
}
else {
var insertionIndex = 10;
}
for (var ii = 0; ii < 5; ii++) {
paragraph.insertBefore(p[ii], paragraph.childNodes[insertionIndex]);
}
}
}
