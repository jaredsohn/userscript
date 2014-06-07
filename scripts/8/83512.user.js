// ==UserScript==
// @name           Link zur ersten und letzten Threadseite
// @author         Danzelot
// @namespace      http://userscripts.org/users/danzelot
// @include        http://forum.mods.de/bb/index.php
// @include        http://forum.mods.de/bb/
// ==/UserScript==

var bookmarks = document.getElementById("bookmarklist");
Array.forEach(bookmarks.querySelectorAll("a[href^='thread.php']"), function( a){
	var href = a.getAttribute("href").match(/(thread\.php\?TID=\d*)/)[0];
	var firstpage = document.createElement("a");
	var lastpage = document.createElement("a");
	var cellfirst = document.createElement("td");
	var celllast = document.createElement("td");
	var abstand = document.createElement("span");
	abstand.innerHTML = "&nbsp;";
	firstpage.setAttribute("href", href);
	firstpage.innerHTML="[1]";
	lastpage.setAttribute("href", href + "&last=1#last_reply");
	lastpage.innerHTML="[&gt;]";
	cellfirst.appendChild(firstpage);
	celllast.appendChild(lastpage);
	a.parentNode.parentNode.insertBefore(celllast, a.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
	a.parentNode.parentNode.insertBefore(cellfirst, a.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
});