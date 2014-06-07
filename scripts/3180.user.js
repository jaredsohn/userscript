// dejalicious
// Author: Kevin P Kleinfelter
// License: Creative Commons Attribution-ShareAlike 2.5 (http://creativecommons.org/licenses/by-sa/2.5/)
//
// ==UserScript==
// @name		dejalicious
// @namespace   http://www.kleinfelter.com/greasemonkey/dejalicious
// @description Show whether you have a del.icio.us bookmark for the current page. Uses a cache to reduce del.icio.us hits. Adds '(+)' to the title for bookmarked sites.
// @include	 http://*
// ==/UserScript==

// dejalicious.user.js
//
// Copyright 2006, Kevin P. Kleinfelter
// author:	  Kevin P. Kleinfelter (greasemonk at kleinfelter dot com)
// This file is licensed under the terms of the Artistic License as
// described at http://www.opensource.org/licenses/artistic-license.php
//
// This GreaseMonkey script displays an indication as to whether
// you have a del.icio.us bookmark for the page you are viewing. It is similar
// in function to the "Familiar Taste" greasemonkey script, except this on
// uses cached bookmarks, where Familiar Taste hit del.icio.us for each page
// you loaded in your browser (and got banned for that reason).
//
//  February 8, 2006	initial release
//  October 20, 2006	configurable prefix for marked/unmarked sites; move the indicator to the beginning
//  October 24, 2006	Use the new del.icio.us API
//  October 24, 2006	put the indicator back at the end of the title


(function() {

	// debugging flags/values
	var debug = true;
	const MINUTES_BETWEEN_GET_ALL = 60;
    	const USER_AGENT = '/dejalicious.user.js';
	function GML(s) {
		if (debug) {
			GM_log(s);
		}
	}

	GML('dejalicious: ' + window.location.href);
	var nothing;
	var now = (new Date() + 0);

	// Ensure consistent use of names with setValue/getValue and element IDs
	var kUser		= 'username';
	var kPass		= 'password';
	var kFamiliar	= 'familiar';
	var kStrange	= 'strange';
	var kCache		= 'cache';
	var kHit		= 'hittime';
	var kUpdated	= 'DeliciousLastUpdated';
	var idConfig	= 'dejalicious_config';
	var kPoll		= 'poll';

	var urlPrefix     = 'https://api.del.icio.us/v1/';
	var urlLastUpdate = urlPrefix + 'posts/update';
	var urlFetchAll   = urlPrefix + 'posts/all?';

	var urlCurrent	= window.location.href;
	var user		= GM_getValue(kUser, nothing);
	var pass		= GM_getValue(kPass, nothing);
	var familiar	= GM_getValue(kFamiliar, "(+) ");
	var strange		= GM_getValue(kStrange, "(-) ");

	var timeLastHit   = GM_getValue(kHit, 0);
	var LastUpdated   = GM_getValue(kUpdated, nothing);
	var timeLastPolled= GM_getValue(kPoll, nothing);
	var idUser  	= 'dejalicious_username';
	var idPass  	= 'dejalicious_password';
	var idStrange  	= 'dejalicious_strange';
	var idFamiliar  	= 'dejalicious_familiar';

	if (! GM_xmlhttpRequest) {
		alert('dejalicious greasemonkey script cannot function without a modern release of Firefox. (No xmlhttprequest.)');
		return;
	}

	function SaveConfig() {
		var usr 	= document.getElementById(idUser).value;
		var pwd	= document.getElementById(idPass).value;
		var familiar= document.getElementById(idFamiliar).value;
		var strange = document.getElementById(idStrange).value;
		GM_setValue(kUser, usr);
		GM_setValue(kPass, pwd);
		GM_setValue(kFamiliar, familiar);
		GM_setValue(kStrange, strange);
		GM_setValue(kHit, 0);		// force a refresh after saving preferences

		var win = document.getElementById(idConfig);
		win.style.display = 'none';
	}

	function ShowConfig() {
		var tUser = user;
		var tPass = pass;
		var tFamiliar = familiar;
		var tStrange = strange;
		if (!tUser) tUser = '';
		if (!tPass) tPass = '';
		if (!tFamiliar) tFamiliar = '';
		if (!tStrange) tStrange = '';

		var c = document.createElement("div");
		c.setAttribute("style", "margin: 3em 15%; width: 20em; position: fixed; top: 0; left: 0; border: thin solid black; color: black; background: #ACF; opacity: 0.9; " +
						 "font-size: 12pt; " +
						 "z-index: 99999; padding: 6px; display: none; " +
						 "font-family: Arial, sans-serif;");
		c.setAttribute("id", idConfig);

		// Start with a top-level form and table.
		var form = document.createElement("form");
		form.setAttribute("method", "get");
		form.setAttribute("action", "");
		form.setAttribute("id", idConfig + 'Form');
		form.setAttribute("style", "padding: 0; margin: 0;");
		var table = document.createElement("table");
		table.setAttribute("style",
					 "width: 100%; margin: 5px; padding: 5px; " +
					 "border-spacing: 0;");
		table.setAttribute("id", "ft_config_table");
		form.appendChild(table);
		var caption = document.createElement("caption");
		caption.setAttribute("style", "width: 100%; text-align: left");
		strong = document.createElement("strong");
		strong.appendChild(document.createTextNode("Dejalicious Configuration:"));
		caption.appendChild(strong);
		table.appendChild(caption);

		table.appendChild(make_config_row("username", "ID:", tUser, "Your del.icio.us user-ID"));
		table.appendChild(make_config_row("password", "Password:", tPass, "Your del.icio.us password" ));
		table.appendChild(make_config_row("familiar", "Bookmarked Suffix:", tFamiliar, "Add this after the title of saved pages" ));
		table.appendChild(make_config_row("strange", "Unbookmarked Suffix:", tStrange, "Add this after the title of UN-saved pages" ));

		CreateButton(form, 'Save', SaveConfig);
		c.appendChild(form);

		var b = document.getElementsByTagName("body");
		b[0].appendChild(c);
		c.style.display = 'block';
	}

	function CreateButton(aParent, aCaption, aFunction) {
		var b = document.createElement("BUTTON");
		var btext = document.createTextNode(aCaption);
		b.appendChild(btext);
		b.addEventListener('click', aFunction, true);
		aParent.appendChild(b);
	}

	function make_config_row(name, label, value, help) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.setAttribute("style",
						  "width: 50%; text-align: right; padding-right: 3px");
		cell.appendChild(document.createTextNode(label));
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("style", "width: 50%; text-align: left; padding-left: 3px");
		var ctl;

		ctl = document.createElement("input");
		ctl.setAttribute("id", "dejalicious_" + name);
		ctl.setAttribute("type", "text");
		ctl.setAttribute("size", 30);
		ctl.setAttribute("title", help);
		ctl.setAttribute("name", name);
		ctl.setAttribute("value", value);

		cell.appendChild(ctl);
		row.appendChild(cell);
		return row;
	}


	function minutesSincePoll() {
		var age = (new Date(now) - new Date(timeLastHit)) / 1000;  // timestamps are milliseconds since the epoch
		age = age / 60;   // convert seconds to minutes
		return age;
	}

	function hitAgeInSeconds() {
		var age = (new Date(now) - new Date(timeLastHit)) / 1000;  // timestamps are milliseconds since the epoch
		return age;
	}

	// It is time to refresh the cache when ALL of the following are true:
	// * Cache is more than an hour old
	// * Last AJAX hit is at least a minute old (prevents multi-fetching on pages with included content)
	function timeToRefreshCache() {
		if (minutesSincePoll() < MINUTES_BETWEEN_GET_ALL) {
			GML('no refresh because cache is from current hour');
			return false;
		}

		if (hitAgeInSeconds() < 60) {
			GML('no refresh because double-fetch');
			return false;
		}

		return true;
	}

	function canonicalUrl(url) {
		url = url + ""; // make sure it is a string

		url = url.toLowerCase();

		// Delete protocol from the URL
		url = url.replace(/^http:\/\//, '');
		url = url.replace(/^https:\/\//, '');

		// Delete leading "www."
		url = url.replace(/^www\./, '');

		// Delete trailing slash
		url = url.replace(/\/$/, '');
		return url;
	}

	function urlInCache(aUrl) {
		aUrl = " " + canonicalUrl(aUrl) + " ";

		var cache = GM_getValue(kCache, " ");
		if (cache.indexOf(aUrl) < 0) {
			return false;
		}

		return true;
	}

	function showIndicator(url) {
		if (urlInCache(url)) {
			showTaste(url, true);
		} else {
			showTaste(url, false);
		}
	}

	function receiveFetchAll(response, pageUrl) {
		GML('received response to GET ALL, from url:' + pageUrl);

		var r = response.replace(/<[^>]*>/,'');  // remove the initial <?xml .... ?> tag
		var xmlDoc = new XML(r);	// this XML object was added in Firefox 1.5.0.
		var temp = " ";

		// I have no idea how the following for loop works. I lifted it from
		// http://weblog.infoworld.com/udell/2004/09/29.html#a1085
		for each (p in xmlDoc..post.@href) {
			temp += canonicalUrl(p) + " ";
		}
		temp += " ";
		GM_setValue(kCache, temp);

		showIndicator(pageUrl);

	}

	function saveTimeHit() {
		GM_setValue(kHit, (new Date() + 0));
	}

	function receiveLastUpdate(response, urlCurrent) {
		var start;
		var tmp;
		GML('received response to GET-LAST-UPDATED');
		timeLastPolled = new Date() + 0;
		GM_setValue(kPoll, timeLastPolled);
		start = response.indexOf('time=');
		if (start < 0) {
			return;
		}
		tmp = response.substr(start + 6); // Skip 'time="'
		timestamp = tmp.substr(0, 20);
		if (timestamp == LastUpdated) {
			// use the cache, since it is up to date
			GML("using cache because no newer data at delicious; urlCurrent is " + urlCurrent);
			showIndicator(urlCurrent);
			return;
		}

		LastUpdated = timestamp;
		GM_setValue(kUpdated, LastUpdated);

		// Cache is out of date -- refresh it.
		GML('Newer data at delicious -- calling xmlhttprequest with:' + urlFetchAll);
		saveTimeHit();
		GM_xmlhttpRequest({
			method:  "GET",
			url:	 urlFetchAll,
			headers: {
				'User-agent':
					'Mozilla/4.0 (compatible) Greasemonkey' + USER_AGENT,
					'Accept': 'text/xml,application/xml',
					'Authorization':
					'Basic ' + btoa(user + ":" + pass),
					},
			onload: function(response) {
				receiveFetchAll(response.responseText, urlCurrent);
				}
		});


	}

	function refreshCache(currentUrl) {
		var d = new Date();
		var atime = d.getHours() * 3600 + d.getMinutes() * 60;

		GML('calling xmlhttprequest with:' + urlLastUpdate);
		saveTimeHit();
		GM_xmlhttpRequest({
			method:  "GET",
			url:	 urlLastUpdate,
			headers: {
				'User-agent':
					'Mozilla/4.0 (compatible) Greasemonkey' +
					'/abc123good_taste.user.js',
					'Accept': 'text/xml,application/xml',
					'Authorization':
					'Basic ' + btoa(user + ":" + pass),
					},
			onload: function(response) {
				receiveLastUpdate(response.responseText, currentUrl);
				}
		});
	}


	function showTaste(aUrl, found) {
		var t = document.title;
		if (found) {
			t = t + familiar;
		} else {
			t = t + strange;
		}
		document.title = t;
	}


	function main() {
		GM_registerMenuCommand('Dejalicious setup', ShowConfig);
		if (!user || !pass) {
			ShowConfig();
			return;
		}

		if (timeToRefreshCache()) {
			refreshCache(urlCurrent);
			return;
		}
		showIndicator(urlCurrent);

	}

	// Don't process child frames -- just the root window, because that is all
	// the user can bookmark.
	if (top == self) {
		main();
	} else {
	}

})();

