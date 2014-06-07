// ==UserScript==
// @name          HTML-RFC
// @namespace     hege.cc/userscripts
// @description   Redirects from the normal text-file RFCs to the HTML-Version at tools.ietf.org
// @match         *://www.ietf.org/rfc/*
// @version       1.0
// ==/UserScript==
//
var rx = /^(.*:\/\/)www.ietf.org\/rfc\/(.*).txt/;

var res = rx.exec(document.location);
if( res )
	document.location=res[1]+"tools.ietf.org/html/"+res[2];
