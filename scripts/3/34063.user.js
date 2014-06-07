// ==UserScript==
// @name           Fix Charter
// @author         Zach Dwiel
// @namespace      http://dwiel.net
// @description    If a Charter URL is returned, forward to google search instead
// @include        *://*
// ==/UserScript==

function main()
{
	var url = document.location.href;
	if(url.indexOf('www11.charter.net') == 7) {
		s = /qo=([^&]+)/i.exec(url)
	} else if(url.indexOf('guide.opendns.com') == 7) {
		s = /url=(.+)/i.exec(url)
	} else {
		return
	}
	document.location.href = "http://www.google.com/search?q="+s[1]+"&btnI=745"
}

window.addEventListener("load", main, false);
