// ==UserScript==
// @name           FindLaw Printer Friendly
// @namespace      localhost
// @description    Always display printer-friendly version of US Supreme Court cases on FindLaw.
// @include        http://caselaw.lp.findlaw.com/*
// ==/UserScript==

// We want to replace a URL like this:
//   http://caselaw.lp.findlaw.com/scripts/getcase.pl?court=US&vol=426&invol=794
//  and similar (some have 'navby=case' and other stuff)
// with one like this:
//   http://caselaw.lp.findlaw.com/scripts/printer_friendly.pl?page=us/426/794.html

var nice_url = "http://caselaw.lp.findlaw.com/scripts/printer_friendly.pl?";
var url = window.location.href;
if (!url.match(/printer_friendly/)) {
	var court = url.match(/court=(\w+)/)[1];
	court = court.toLowerCase();
	if (court == "us") {
		var vol = url.match(/vol=(\d+)/)[1];
		var invol = url.match(/invol=(\d+)/)[1];
		var new_url = nice_url + "page=" + court + "/" + vol + "/" + invol + ".html";
		window.location.replace(new_url);
	}
}

// Now that we're in a printer friendly place, convert all links
// to further Supreme Court opinions to the printer friendly ones
for (var i = document.links.length - 1; i >= 0; i--) {
	var caseLink = document.links[i];
	if (caseLink.href.match(/invol=/)) {
		var caseURL = caseLink.href;
		var caseVol = caseURL.match(/vol=(\d+)/)[1];
		var caseInVol = caseURL.match(/invol=(\d+)/)[1];
		var anchor = "";
		if (caseURL.match(/#/)) { anchor = caseURL.match(/(#\d+)/)[1]; }
		caseURL = nice_url + "page=us/" + caseVol + "/" + caseInVol + ".html" + anchor;
	// Apparently the above is insufficient to rewrite the URL
	// so we do it explicitly
		if (caseURL != caseLink.href) {
			caseLink.href = caseURL;
		}
	}
}
