/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name        GrooveShark without ads.
// @author		gkhn
// @description Remove ads from GrooveShark
// @include     http://*.grooveshark.com/*
// @include	https://*.grooveshark.com/*
// @version     0.1.1
// ==/UserScript==

function removeAds() {
	var ad=document.getElementById("adBar");
	var main=document.getElementById("mainContentWrapper");
	ad.parentNode.removeChild(ad);
	main.style.marginRight='auto';
}


document.addEventListener('DOMNodeInserted', removeAds ,false);
window.addEventListener('load', removeAds ,false);