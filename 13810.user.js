// ==UserScript==
// @author		Marcin Zielinski - http://kxp.pl
// @name		RapidShare download ready alert by happy
// @description		RapidShare download ready alert by happy
// @include		http*://*rapidshare.de/*
// @include		http*://*rapidshare.com/*
// ==/UserScript==

var show_alert;

function check_rapid() {
	if (document.getElementById("dl").innerHTML.indexOf("seconds")!=-1 ||
            document.getElementById("dl").innerHTML.indexOf("minutes")!=-1) {
		show_alert=1;
		setTimeout(check_rapid, 1000);
	} else
	if ((document.getElementById("dl").innerHTML.indexOf("submit") != -1) &&
		(show_alert==1)) {
		alert('Download ready!');
	}
}

(function() {
	if (document.body.parentNode.innerHTML.indexOf("unescape") != -1) {
		show_alert=0;
		setTimeout(check_rapid, 5000);
	}
})();

