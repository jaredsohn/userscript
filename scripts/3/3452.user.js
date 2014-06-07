// ==UserScript==
// @name           Clean up sybase online docs
// @namespace      http://userscripts.org/people/4711
// @description    Hides the Sybase banner at the top of the online manuals
// @include        http://manuals.sybase.com/onlinebooks/*
// ==/UserScript==

var allFrames, thisFrame;
allFrames = document.getElementsByTagName('frame');
for (var i = 0; i < allFrames.length; i++) {
	thisFrame = allFrames[i];
	if (thisFrame.name == 'techlib') {
		thisFrame.parentNode.rows = "0,*";
	}
}
