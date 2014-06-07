// ==UserScript==
// @name           Last.fm skreemr Search icon
// @namespace      skreemr
// @description    Places a Skreemr icon, pressing it will search skreemr for current info being viewed.
// @include        http://www.last.fm/music/*
// @include        www.last.fm/music/*
// ==/UserScript==

var searx = window.location.href;
searx = searx.replace("http://www.last.fm/music/","http://skreemr.com/results.jsp?q=");
searx = searx.replace("/_/","+");


var navbar, newElement;
navbar = document.getElementById('shoutBoxLink');
if (navbar) {
    newElement = document.createElement('div');
	var inhtml = '<a href="'+ searx +'" target="_blank"><img src = "http://skreemr.com/favicon.ico" position = "absolute"/></a> ';
	newElement.innerHTML = inhtml;
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}