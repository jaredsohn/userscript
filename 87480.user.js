// ==UserScript==
// @name           FWZ: No game shit
// @namespace      I'M NOT GOING TO DO A FUCKING TF2 THEME THAT'S DUMB
// @include        http://forumwarz.com/*
// @include        http://*.forumwarz.com/*
// ==/UserScript==

if(document.URL.replace(/.*\//,"") == "civil"){
	document.getElementsByTagName("table")[2].style.display = "none";
}

if(document.URL.replace(/.*\//,"") == "discussions"){
	document.getElementsByTagName("table")[3].style.display = "none";
}

if(document.URL.replace(/.*\//,"") == "me" || document.URL.replace(/.*\//,"") == ""){
	location.href = "http://www.forumwarz.com/discussions";
}