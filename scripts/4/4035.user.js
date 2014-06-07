// ==UserScript==
// @name         Google Video - Download link
// @version      0.1
// @date         2006-05-06
// @description  Adds a real download link
// @author       Simon Arlott
// @namespace    http://simon.arlott.org/gm/
// @include      http://video.google.com/*
// ==/UserScript==
/*
	Copyright © 2006  Simon Arlott

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

	window.addEventListener("load", function(e) {
		var found = 0;
		var added = 0;
		var url;

		var embeds = document.getElementsByTagName("embed");
		for (var i = 0; i < embeds.length ; i++) {
			if (embeds[i].src.match(/^\/googleplayer\.swf/) && !found) {
				found = 1;
				url = embeds[i].src.replace(/\/googleplayer\.swf\?videoUrl=/,"");
				url = unescape(url.substring(0,url.indexOf('&')));
			}
		}	

		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length ; i++) {
			if (tds[i].getAttribute("class") == "td-help" && !added) {
				added = 1;
				var tmp;
				if (found) {
					tmp = document.createElement("span");
					tmp.innerHTML = '&nbsp;- ';
					tds[i].appendChild(tmp);
					tmp = document.createElement("a");
					tmp.setAttribute("class","a-help");
					tmp.setAttribute("href",url);
					tmp.innerHTML = 'Download Video';
					tds[i].appendChild(tmp);
				} else {
					tmp = document.createElement("span");
					tmp.innerHTML = '&nbsp;- Error finding URL';
					tds[i].appendChild(tmp);
				}
			}
		}
	}, false);
}());
