// ==UserScript==
// @name           epguides to torrent
// @namespace      eptorrent
// @include        http://epguides.com/*
// @include        http://www.epguides.com/*
// ==/UserScript==

function trim(s) {
	return s.replace(/^\s+|\s+$/g, "");
}

function getText(o) {
	if(o.textContent) {
		return o.textContent;
	}
	return o.innerText;
}

var showTitle = getText(document.querySelector("h1 a"));

var pre = document.querySelector("#eplist pre");
var lines = pre.innerHTML.split("\n");
for(var i=0; i < lines.length; i++) {
	var line = trim(lines[i]);
	var parts = line.split(/\s+/);
	//GM_log(JSON.stringify(parts));
	if(/^\d/.test(parts[0]) && /\-/.test(parts[1])) {
		var num = parts[0];
		var ep = parts[1];
		var urlHtml = line.split("<a href=")[1];
		var url = urlHtml.split(/["']/)[1];
		//GM_log("URL: " + url);
		var sel = document.querySelector("a[href='" + url + "']");
		if(sel) {
			var _ = ep.split("-");
			var season = _[0];
			var number = _[1];
			if(season.length < 2) {
				season = "0" + season;
			}
			if(number.length < 2) {
				number = "0" + number;
			}
			sel.href = "http://torrentz.eu/search?f=" + showTitle + " s" + season + "e" + number;
		}
	}
}