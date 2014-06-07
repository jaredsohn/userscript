// ==UserScript==
// @name         UserFriendly.org - Direct Image Link
// @version      0.3
// @date         2006-01-30
// @description  Changes the front page image link to go direct to the full size image instead of the comments page
// @author       Simon Arlott
// @namespace    http://simon.arlott.org/gm/
// @include      http://userfriendly.org/
// @include      http://www.userfriendly.org/
// @include      http://userfriendly.org/cartoons/archives/*
// @include      http://www.userfriendly.org/cartoons/archives/*
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
	if (window.location.href == "http://userfriendly.org/" || location == "http://www.userfriendly.org/") {
		var images = window.document.getElementsByTagName("img");
		for (var i=0;i<images.length;i++)
			if (images[i].src.match(/.*\/cartoons\/.*\/xuf.*/))
				images[i].parentNode.setAttribute("href",images[i].src.replace(/\/xuf/,"/uf"));
	} else {
		// This should not be recoded to download the comments page and discover
		// if the strip is a nag one in advance - don't waste UFie's resources
		var title = window.document.getElementsByTagName("title")[0];
		if (title.innerHTML == "404 Not Found")
			// It's very important that the following check is made, otherwise
			// an infinite loop is possible if the new URL is also a 404
			if (window.location.href.match(/\/uf[^ng]/))
				window.location.replace(window.location.href.replace(/\/uf[^ng]/,"/ufng0"));
	}
}());
