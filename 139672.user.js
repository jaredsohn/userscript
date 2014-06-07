// ==UserScript==
// @id             www.tumblr.com-c028e063-6183-4de6-8e22-ded994fce35e@scriptish
// @name           Resize Post Box
// @version        1.0
// @namespace      
// @author         Nicholas McGovern
// @description    Resizes the post textbox to something more appropriate for monitor resolutions post 1995
// @include        http://www.tumblr.com/edit/*
// @run-at         document-end
// ==/UserScript==


setTimeout(resizePostBox, 1500);

function resizePostBox() {
	document.getElementById("post_two_ifr").style.height="1400px";
}