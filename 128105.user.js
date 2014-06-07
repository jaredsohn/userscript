// ==UserScript==
// @name           Adf.ly,lienscash.com & Adfoc.us bypasser
// @namespace      tag: adfly,lienscash,adfocus,bypasser
// @description    Bypasses links from adf.ly, lienscash.com, adfoc.us.
// @include        http://q.gs/*
// @include        http://9.bb/*
// @include        http://u.bb/*
// @include        http://j.gs/*
// @include        http://adf.ly/*
// @include        http://www.lienscash.com/l/*
// @include        http://lienscash.com/l/*
// @include        http://adfoc.us/serve/*
// ==/UserScript==

// Version: 1.1.1

// Changelog:
// Version 1.1.1
// - small bugfixes
// Version 1.1
// - improvements all around the code
// Version 1.0
// - Initial release


(function() {
	var loc = document.location.href, interval, secinterval, bypassers = {
		adfly: function() {
			var tehregxp = /var url = '([^']+)'/,
				reg2     = /\/locked\/([a-zA-Z0-9\-_]+)\/?$/,
				reg3     = /\d+\/(http.+?)$/i;
			if (loc.match (reg2))
			{
				clearInterval (interval);
				var uri = (reg2.exec (loc))[1];
				document.title = "** Waiting .. **";
				secinterval = setInterval (function() {
					if (document.getElementById ("continue").style.display === "block")
						bypassers.doRedirect ("http://adf.ly/" + uri);
				}, 1000);
			}
			else if (loc.match (reg3))
			{
				clearInterval (interval);
				bypassers.doRedirect ((reg3.exec (loc))[1]);
			}
			else if (document.head.innerHTML.match (tehregxp))
			{
				clearInterval (interval);
				bypassers.doRedirect ((tehregxp.exec (document.head.innerHTML))[1]);
			}
			else {
				clearInterval(interval);
				alert ("Something went wrong. Try to reload the page.");
			}
		},
		lienscash: function() {
			var matches = /<a href="([^"]+)">skip/;
			if (document.body.innerHTML.match (matches))
			{
				clearInterval (interval);
				bypassers.doRedirect ((matches.exec (document.body.innerHTML))[1]);
			}
		},
		adfocus: function() {
			var regxp = /\?id=(\d+)$/;
			if (document.location.href.match (regxp))
				bypassers.doRedirect ("http://adfoc.us/serve/click/?id=" + (regxp.exec (document.location.href))[1]);
		},
		doRedirect: function (uri) {
			document.head.innerHTML = "<title>** Redirect in progress **</title>";
			document.body.innerHTML = "Bypassing this link (redirecting to " + uri + "), please wait...";
			window.location = uri;
		}
	};
	if (loc.indexOf ("adf.ly") !== -1 || loc.indexOf ("q.gs") !== -1 || loc.indexOf("9.bb") !== -1 || loc.indexOf ("u.bb") !== -1 || loc.indexOf ("j.gs") !== -1)
		interval = setInterval (bypassers.adfly, 1000);
	else if (loc.indexOf ("lienscash.com") !== -1)
		interval = setInterval (bypassers.lienscash, 1000);
	else
		bypassers.adfocus();
})();
