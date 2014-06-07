// ==UserScript==
// @name           Facebook Https
// @namespace      http://www.get.vn
// @description    A script to change facebook http link to https link
// @include        https://*.facebook.com
// @include        https://*.facebook.com/*
// ==/UserScript==

var aNodes = window.document.getElementsByTagName("a");
for (var i=0;i<aNodes.length;i++) {
    if (aNodes[i].hasAttribute("href")) {
        var href = aNodes[i].getAttribute("href");
        aNodes[i].setAttribute("href", href.replace(/^http:\/\//g, "https://"));
    } else if (aNodes[i].hasAttribute("src")) {
		var href = aNodes[i].getAttribute("src");
        aNodes[i].setAttribute("src", href.replace(/^http:\/\//g, "https://"));
	}
}

var formNodes = window.document.getElementsByTagName("form");
for (var i=0;i<formNodes.length;i++) {
    if (formNodes[i].hasAttribute("action")) {
		var href = formNodes[i].getAttribute("action");
        formNodes[i].setAttribute("action", href.replace(/^http:\/\//g, "https://"));
	}
}