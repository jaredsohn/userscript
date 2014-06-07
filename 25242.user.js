// ==UserScript==
// @name           Google Firefox to normal google
// @namespace      mcr.joe@googlemail.com
// @description    Re-direct to Normal Google from firefox's homepage (UK ONLY)
// @include        http://www.google.co.uk/firefox
// ==/UserScript==

var currURI = document.location.href;
var postDomainURI = currURI.substring(currURI.indexOf("/", 7)+1);
var newURI = "http://google.co.uk/";
document.location.href = newURI;