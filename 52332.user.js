// YouTube Time Filter
// v1.1
// 2009.25.06
// Copyright (c) 2009, Eric Laspe
// http://www.google.com/profiles/ericdlaspe
//
// ---------------------------------------------------------------------
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ---------------------------------------------------------------------
//
// ==UserScript==
// @name           YouTube Time Filter
// @namespace      http://www.google.com/profiles/ericdlaspe
// @description    Filter YouTube search results based on time (+/- 1 second)
// @include        http://www.youtube.com/results?*
// ==/UserScript==

// Get Times
var vtimes = document.getElementsByClassName('video-time');

// Get Time from Cookie
mintarget = null;
sectarget = null;
cookiename = 'timefilter';
cookievalue = readCookie(cookiename);
if (cookievalue)
{
	extractTimeFromCookie();
	setCellDisplay();
}

// Make Link for Setting Time Filter
var timeLink = document.createElement('a');
var timeText = document.createTextNode('Set Time Filter');
timeLink.appendChild(timeText);
timeLink.setAttribute('href', '');

// Make Link for Clearing Time Filter
var clearLink = document.createElement('a');
var clearText = document.createTextNode('Clear');
clearLink.appendChild(clearText);
clearLink.setAttribute('href', '');

// Encapsulate Links in a New Div
var newDiv = document.createElement('div');
var timeSetting = ' | ';
if (mintarget != null && sectarget != null)
	timeSetting = ' ['+mintarget+':'+sectarget+'] ';
var barText = document.createTextNode(timeSetting);
newDiv.setAttribute('style', 'font-weight: bold; font-size: 15px; float: right;');
newDiv.appendChild(timeLink);
newDiv.appendChild(barText);
newDiv.appendChild(clearLink);

// Inject New Div
var searchhead = document.getElementById('search-section-header');
searchhead.parentNode.insertBefore(newDiv, searchhead);

// Add Click Listeners
timeLink.addEventListener('click', setTimeFilter, false);
clearLink.addEventListener('click', clearTimeFilter, false);

// Hide Playlists
var pcells = document.getElementsByClassName('playlist-cell');
for (i = 0; i < pcells.length; i++)
	pcells[i].style.display = 'none';

// Hide Channels
var ccells = document.getElementsByClassName('channel-cell');
for (i = 0; i < ccells.length; i++)
	ccells[i].style.display = 'none';

// Hide Shows
var scells = document.getElementsByClassName('show-cell');
for (i = 0; i < scells.length; i++)
	scells[i].style.display = 'none';

// Hide Promoted Videos
var pva = document.getElementById('search-pva');
pva.style.display = 'none';

/////////////////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////////////////

function createCookie(name, value) {
	document.cookie = name+"="+value+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function setTimeFilter() {
	cookievalue = prompt("Time:", readCookie(cookiename));
	createCookie(cookiename, cookievalue);
	if (extractTimeFromCookie())
		setCellDisplay();
}

function extractTimeFromCookie() {
	if (cookievalue) {
		var timetarget = cookievalue.split(':');
		if (timetarget.length != 2) nullTargets();
		else {
			mintarget = parseInt(timetarget[0],10);
			sectarget = parseInt(timetarget[1],10);
			if (!validateInt(mintarget) || !validateInt(sectarget)) nullTargets();
		}
	}
}

function setCellDisplay() {
	if (mintarget != null && sectarget != null) {
		for (i = 0; i < vtimes.length; i++) {
			var runtime = vtimes[i].textContent.split(':');
			var min = parseInt(runtime[0],10);
			var sec = parseInt(runtime[1],10);
			if (min == mintarget && 
			(sec == sectarget || sec == plusOne(sectarget) || sec == minusOne(sectarget)))
				vtimes[i].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
			else vtimes[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
		}
	} else {
		for (i = 0; i < vtimes.length; i++) {
			vtimes[i].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
		}
	}
}

function clearTimeFilter() {
	nullTargets();
	createCookie(cookiename, '');
	setCellDisplay();
}

function plusOne(secs) {
	if (secs != 59) secs++;
	return secs;
}

function minusOne(secs) {
	if (secs != 0) secs--;
	return secs;
}

function nullTargets() {
	mintarget = null;
	sectarget = null;
}

function validateInt(num) {
	return /^\d+$/.test(num);
}
