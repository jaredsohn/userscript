//MAKE SURE JAVASCRIPT IS BLOCKED FOR MYSHAREFILE.COM WITH NOSCRIPT!

// ==UserScript==
// @name          mysharefile.com d/l delay bypass
// @namespace     http://www.digivill.net/~joykillr
// @description   Immediately show the download box without having to wait for the time delay.
// @include       http://*.mysharefile.com/*
// ==/UserScript==

(function() {
	if (!document.body.parentNode.innerHTML.indexOf("unescape")) {
		return;
	} else {
		var rew = document.body.parentNode.innerHTML.indexOf("unescape");
		rew = document.body.parentNode.innerHTML.substr(rew);
		rew = rew.split("'")[1];
		rew = unescape(rew);
		rew = rew.split("www.mysharefile.com")[1];
		rew = "http://www.mysharefile.com" + rew;
		document.getElementById("wait").innerHTML = '<b><a href="' + rew + '">Click here to download file.</a></b>';
	}
})();
