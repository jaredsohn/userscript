// ==UserScript==
// @name        utmRemover
// @description Removes the annoying utm_* tags that Google feedburner (feedproxy) adds to URLs.
// @include     http://*
// @version     1.0.1
// @icon        https://dl.dropbox.com/u/5448024/web/userscripts/utm_remover/utmRemover-64.png
// @run-at      document-start
// ==/UserScript==

newHref=location.href.replace(/\?/, "?&");	//Add an & infront of the first parameter to simplify the process
newHref=newHref.replace(/&utm_[^&#]+/g, "");	//Replace all utm_* tags with nothing
newHref=newHref.replace(/\?&/, "?");	//Remove the extra &
if (newHref.charAt(newHref.length-1)=="?")	//If last character is an ? there are no parameters left
	newHref=newHref.substr(0, newHref.length-1);	//Remove the ? at the end
history.replaceState(null, "", newHref);	//Replace the URL with the new one without reloading the page