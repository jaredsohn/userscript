// ==UserScript==
// @name           Browse with Twitter
// @namespace      com.lapoutre.greasemonkey
// @description    Send all your browsed pages to Twitter
// @include        *
// @exclude        http://goatse.cx/*
// ==/UserScript==

/*

WARNING
=======

This script is a total hack! The following issues exist:
- you don't have any browsing privacy anymore!!!
- you need to log in to Twitter (once per session)
- the official Twitter API is not used, it can break any day


This script updates your twitter.com status with a message
"Browsing [document.title]" whenever you load a web page.

Be sure to set the @exclude rules for sites you don't want 
anyone to know you're browsing, or remember the famous words
by Scott McNealy: "You have zero privacy anyway, Get over it."

Another good idea is to only white-list sites you *want* to
get mentioned on Twitter, using the @include list.

LICENSE
=======
Browse with Twitter - (c) 2007 J.Q. la Poutre

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

*/


var BrowseWithTwitter = {
	postUrl: 'http://twitter.com/status/update',
	
	update: function() {
		// skip frames
		if (window.parent && window.location != window.parent.location) return;
		var title = document.title;
		if (! title) title = window.location.hostname;
		title = 'status=' + encodeURIComponent('Browsing: ' + title.substring(0, 140));
		GM_xmlhttpRequest({
			method: "POST", 
			headers: {
//				'Authorization':'Basic ' + this.user + ':' + this.pass
				'Referer': 'http://twitter.com/home',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': title.length,

			},

			url: this.postUrl,
			data: title,
			onload: function(res) { GM_log(res.status); },
			onerror: function(res) { GM_log("Error: " + res.statusText); },
		});
	}

};

BrowseWithTwitter.update();