// ==UserScript==
// @name         dejalicious ++
// @namespace    http://lucasrichter.tumblr.com/
// @description  Dejalicious with a little bit of GUI stuff. Bottom corner shows whether or not you've got the current page bookmarked, along with the tags you've given it, and lets you mark it if you haven't.
// @includes     *
// @excludes     http://del.icio.us/*
// @excludes     *.txt
// @excludes     *.js
// ==/UserScript==

/*
Author: Lucas Richter, with thanks to Greg Pagendam-Turner, Jasper de Vries and Kevin P Kleinfelter
License: Creative Commons Attribution-ShareAlike 2.5 (http://creativecommons.org/licenses/by-sa/2.5/)
*/

	var debug = true;
	const MINUTES_BETWEEN_GET_ALL = 1; //60;
    	const USER_AGENT = '/dejalicious_plus_plus.user.js';

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
	var familiar	= GM_getValue(kFamiliar, "Tagged");
	var strange		= GM_getValue(kStrange, "Tag...");

	var timeLastHit   = GM_getValue(kHit, 0);
	var LastUpdated   = GM_getValue(kUpdated, nothing);
	var timeLastPolled= GM_getValue(kPoll, nothing);
	var idUser  	= 'dejalicious_username';
	var idPass  	= 'dejalicious_password';
	var idStrange  	= 'dejalicious_strange';
	var idFamiliar  	= 'dejalicious_familiar';

	if (! GM_xmlhttpRequest) {
		alert('dejalicious++ greasemonkey script cannot function without a modern release of Firefox. (No xmlhttprequest.)');
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
	
	function getUrlTags(aUrl)
	{
		aUrl = " " + canonicalUrl(aUrl) + " ";

		var cache = GM_getValue(kCache, " ");
		if (cache.indexOf(aUrl) < 0) {
			return "tags not found!!";
		}
		
		var tagsEnd = cache.indexOf("]]", cache.indexOf(aUrl));
		if (tagsEnd < 0) {
			return "tags not found!!";
    }
		
		// +2 is for [[
		var tags = cache.substring(cache.indexOf(aUrl)+aUrl.length+2, tagsEnd);
	   
	   return tags;
  }

	function showIndicator(url) {
		if (urlInCache(url)) {
//		alert(GM_getValue(kCache, " "));
//alert(getUrlTags(url));
			showTaste(url, true, getUrlTags(url));
		} else {
//		alert(GM_getValue(kCache, " "));
			showTaste(url, false, "");
		}
	}

	function receiveFetchAll(response, pageUrl) {
		GML('received response to GET ALL, from url:' + pageUrl);

		var r = response.replace(/<[^>]*>/,'');  // remove the initial <?xml .... ?> tag
		var xmlDoc = new XML(r);	// this XML object was added in Firefox 1.5.0.
		var temp = " ";

		// I have no idea how the following for loop works. I lifted it from
		// http://weblog.infoworld.com/udell/2004/09/29.html#a1085
//		for each (p in xmlDoc..post.@href) {
		for each (p in xmlDoc..post) {
			temp += canonicalUrl(p.@href) + " "+"[["+p.@tag+"]] ";
		}
		temp += " ";
		GM_setValue(kCache, temp);
//alert('setcache: '+temp)
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


	function showTaste(aUrl, found, tags) {
	  var tagUrl = "javascript:location.href='http://del.icio.us/post?v=4;url='+encodeURIComponent(location.href)+';title='+encodeURIComponent(document.title)";
	
	  GM_addStyle('#taste {background: url(http://images.del.icio.us/static/img/delicious.gif) no-repeat top left transparent; position: fixed; z-index: 32766; bottom: 2px; right: 0; padding: 0 0 0 20px; height: 16px; font-family: Arial, Verdana, sans; font-size: 14px; padding-right: 2px; padding-top: 2px;}');
	  GM_addStyle('#taste a {color: #00f; text-decoration: underline; font: Arial,Verdana,sans 16pt; font-weight: normal; font-style: normal;}');
	  GM_addStyle('#taste a:hover {text-decoration: none;}');
	
	  var myDiv = document.createElement('div');
	  myDiv.setAttribute('id', 'taste');
	  document.body.appendChild(myDiv);
	  
	  var t = document.getElementById('taste');
	
		if (found) {
			t.innerHTML = familiar+": "+tags;
		} else {
			t.innerHTML = '<a href="' + tagUrl + '">' + strange + '</a>';
		}
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
