// ==UserScript==
// @name           TPB User Comment Search
// @namespace      TPB Comment Search Engine Using Google
// @authors       	EDB, Alia_Erenel
// @description  	Adds a link to user pages to search for their comments via Google
// @include       	http*://*thepiratebay.org/user/*
// @Note 		All Credits Goes to EDB and Alia Erenel!!!
// ==/UserScript==

// Original Post http://forum.suprbay.org/showthread.php?tid=66500
// Userclass by EDB


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

// The Google search query (just like the batch file)
if(userclass != "blank") {
// This piece of line below edited by tastyteo, because it used to show the related Google searches and it turned at 0 Results...
gquery = "http://www.google.com/search?sitesearch=thepiratebay.org&q=" + userclass + "+" + "%22" + /\/([^\/]+)\/?$/(document.location.href)[1] + "+" + "at%22" + "&q=CET"
}
else {
gquery = "http://www.google.com/search?sitesearch=thepiratebay.org&q=" + "%22" + /\/([^\/]+)\/?$/(document.location.href)[1] + "+" + "at%22" + "&q=CET"
}

// Inserting Search button
var gsearch=document.createElement('div');
  gsearch.innerHTML="<a target=new href=\"" + gquery + "\"> Search "+ /\/([^\/]+)\/?$/(document.location.href)[1] +"'s comments</a>";
      gsearch.style.textAlign='center';

var gloc = document.getElementById("searchResult");
    gloc.parentNode.insertBefore(gsearch, gloc.nextSibling);