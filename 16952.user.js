// ==UserScript==
// @name           What.cd? TimeDisplay
// @namespace      What.cd? TimeDisplay
// @description    Display a clock on What.cd? with local time of What.cd?!
// @include        http://what.cd/*
// @include        http://www.what.cd/*
// @include        http://incegmbh.com/*
// @include        http://www.incegmbh.com/*
// ==/UserScript==

function calcTime(city, offset) {

    d = new Date();
   
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    nd = new Date(utc + (3600000*offset));
   
    return nd.toLocaleString();

}

var logo = document.createElement("div");
logo.innerHTML = '<div align="right">' + calcTime('UTC', +0) + '</div><br>';
	
	
var main, newElement;
main = document.getElementById('userinfobar');
if (main) {
    main.parentNode.insertBefore(logo, main.nextSibling);
}