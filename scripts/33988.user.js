// ==UserScript==
// @name         		 Google Finance Stupidity Protection
// @namespace     	http://www.robertlitzke.com
// @description   		Remove all mention of discussions and groups from Google Finance
// @include       		http://finance.google.com/*

// ==/UserScript==

var groups=document.getElementById("groups");
groups.parentNode.removeChild(groups);
 
var summary=document.getElementById("summary");
var events=document.getElementById("events").parentNode;
ep=events.parentNode;
ep.insertBefore(summary,events);
