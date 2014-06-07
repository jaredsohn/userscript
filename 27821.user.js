// ==UserScript==
// @name           Rapidshare - Timer
// @namespace      http://userscripts.org/users/33073/scripts
// @description    Enables you to enter the Captcha Code before the timer runs out. Until the download is ready, you will see a counter in the top left corner.
// @include        http://*.rapidshare.com/*
// @include        http://*.rapidshare.tld/*
// @include        http://rapidshare.tld/*
// @include        http://lix.in/*
// @include        http://*.rapidsafe.net/*
// @include        http://rapidsafe.net/*
// @exclude        http://rapidshare.tld/users/*
// ==/UserScript==
 
GM_addStyle("#counter { position: fixed; width: 60px; top: 0; left: 0; border: 3px solid #999; padding: 2px 5px; font-size: 12pt;}");
// hide stuff
GM_addStyle("p.downloadlink, div#dl h2, div#dl p, table.klapp { display: none; }");
setTimeout(function() {
	var x = unsafeWindow.c;
	unsafeWindow.c = 2;
	var div = document.createElement("div");
	with (div) {
		id = "counter",
		innerHTML = (x/60).toFixed(1);
	}
	document.body.appendChild(div);
	var rs = function() {
		var timer = window.setInterval(function() {
			x--;
			document.getElementById("counter").innerHTML = x;
			if (x == 0) {
				alert("Download ready!");
				clearInterval(timer);
			}
		}, 1000);
	}
	rs();
}, 500);