// ==UserScript==
// @name         The Register - Cleaner Layout
// @version      0.3
// @date         2006-01-30
// @description  Removes adverts and the left and right sidebars
// @author       Simon Arlott
// @namespace    http://simon.arlott.org/gm/
// @include      http://www.theregister.co.uk/*
// @include      http://www.theregister.com/*
// ==/UserScript==
/*
	Copyright Â© 2006  Simon Arlott

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

(function (){
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = '#MastheadStrap, #LeftNav, #EventBox, #RelatedStuff, .Ad, .TextAd { display: none; }';
	head.appendChild(style);
}());
