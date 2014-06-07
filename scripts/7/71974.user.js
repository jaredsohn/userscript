// ==UserScript==
// @name           SteamV5
// @namespace      SteamV5
// @description    Forces version 5 of the Steam Store
// @include        http://*.steampowered.com/*
// @include        https://*.steampowered.com/*
// ==/UserScript==

function us_get_cookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return us_get_cookie_val(j);
		}

		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}

	return null;
}

function us_get_cookie_val(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset, endstr));
}

function us_set_cookie (name,value,expires,path,domain,secure) {
	document.cookie = name + "=" + escape (value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

if(us_get_cookie('v5') != '1' || us_get_cookie('bbstyleid') != '13') {
	var expiry = new Date();
	expiry.setTime(expiry.getTime() + (1000 * 60 * 60 * 24 * 7));
	us_set_cookie('v5', '1', expiry, '/', false, false);
	us_set_cookie('bbstyleid', '13', expiry, '/', false, false);
	window.location.reload(true);
}