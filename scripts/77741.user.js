// ==UserScript==
// @name           TPB Comment Finder
// @namespace      EDB_gm
// @description    Adds a link to TPB userpages that will query google for that user's torrent comments
// @include        http://*thepiratebay.org/user/*
// ==/UserScript==

var username;
var userclass;
var gquery;
var contentDiv;
var linkDiv

username = document.body.innerHTML;
username = username.substring(username.indexOf("<span>Browse ")+13, username.indexOf("</span>&nbsp;<a class=\"rss\""));
userclass = "blank";
if(document.body.innerHTML.indexOf("http://static.thepiratebay.org/img/vip.gif") != -1) {
	userclass = "vip";
}
if(document.body.innerHTML.indexOf("http://static.thepiratebay.org/img/helper.png") != -1) {
	userclass = "helper";
}
if(document.body.innerHTML.indexOf("http://static.thepiratebay.org/img/trusted.png") != -1) {
	userclass = "trusted";
}

if(userclass != "blank") {
gquery = "http://www.google.com/search?q=site:thepiratebay.org/torrent+" + userclass + "+" + username + "+at"
} else {
gquery = "http://www.google.com/search?q=site:thepiratebay.org/torrent+" + username + "+at"
}

contentDiv = document.getElementById("content");
linkDiv = document.createElement("div");
document.body.insertBefore(linkDiv, contentDiv);
linkDiv.innerHTML = "<a target=new href=\"" + gquery + "\">Search for this users torrent comments</a>";