// googleInEnglish
// This is a Greasemonkey user script to make google websites show in English
// regardless of the country you are in. It also enforces HD mode for youtube
// by default
//
// --------------------------------------------------------------------------
//
// ==UserScript==
// @name		googleInEnglish
// @description		Makes Google's websites show in English wherever you are
// @namespace		http://localhost
// @author		Artem S. Tashkinov

// @include		http://www.google.*
// @include		https://www.google.*

// @include		https://plus.google.com/*

// @include		https://play.google.com/*

// @include		http://*.youtube.com/*
// @include		https://*.youtube.com/*
// @include		http://youtube.com/*
// @include		https://youtube.com/*

// @exclude		http://*.youtube.com/embed/*
// @exclude		https://*.youtube.com/embed/*
// @exclude		http://youtube.com/embed/*
// @exclude		https://youtube.com/embed/*

// @include		http://*.blogspot.com/*

// @version		0.4
// ==/UserScript==

function doCorrectUrl(url, extra) {

	var str = url;
	var add = extra;

	if (!str.match(extra)) {

		var index_qm = str.indexOf("?"); // Question Mark
		var index_hc = str.indexOf("#"); // Hash Char
		var index_ec = str.indexOf("="); // Equal Char

		if (index_qm < 0)
			add = "?" + add;
		else {
			if (index_ec >= 0)
				add = "&" + add;
		}

		if (index_hc >= 0) {
			var a_parts = str.split("#");
			str = a_parts[0] + add + "#" + a_parts[1];
		}
		else
			str = str + add;
	}

	return str;
}

(function() {
	var url = window.location.href;

	url = url.replace(/hl=../i, "hl=en");
	url = url.replace(/gl=../i, "gl=GB");
	url = url.replace(/feature=[\w-.]+&/i, "");
	url = url.replace(/ei=[\w-]+&/i, ""); // stop spying on me!

	url = doCorrectUrl(url, "hl=en");
	url = doCorrectUrl(url, "gl=GB");
	if ( url.match( "youtube.com/" ) )
		url = doCorrectUrl(url, "hd=1");

	if ( window.location.href != url )
		window.location.href = url;
})();
