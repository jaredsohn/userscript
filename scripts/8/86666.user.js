// ==UserScript==
// @name          TPB User Comment Search v2.1
// @authors       Alia_Erenel, EDB, Aaron.Walkhouse
// @description   Adds a link to user pages to search for their comments via Google
// @include       http*://*thepiratebay.org/user/*
// ==/UserScript==

// Getting the username
var username = document.title.match( /^(.*)\s\-/ )[1];

// Getting the user status (credit to EDB)
var userclass;
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

// The Google search query (tweaked by Aaron.Walkhouse)
if(userclass != "blank") {
gquery = "http://www.google.com/search?sitesearch=thepiratebay.org&tbs=rltm:1&filter=0&q=" + userclass + "+" + "%22" + username + "+" + "at%22" + "+" + "CET"
}
else {
gquery = "http://www.google.com/search?sitesearch=thepiratebay.org&tbs=rltm:1&filter=0&q=" + "%22" + username + "+" + "at%22" + "+" + "CET"
}

// Inserting Search button into TPB's layout
var gsearch=document.createElement('div');
  gsearch.innerHTML="<a target=new href=\"" + gquery + "\"> Search "+ username +"'s comments</a>";
  gsearch.style.textAlign='center';
  gsearch.style.marginTop = '5px';  	

var gloc = document.getElementById("searchResult");
	gloc.parentNode.insertBefore(gsearch, gloc.nextSibling);