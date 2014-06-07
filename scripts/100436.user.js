// ==UserScript==
// @name           Resizable Ekşi Frames
// @description    It makes resizable all frame's in Ekşi Sözlük 
// @namespace      
// @version        0.5
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==

function resizable_frame() 
{
	frameset = window.top.document.getElementsByTagName("frameset");
 
for (var i = 0; i < frameset.length; i++) {
 frameset[i].setAttribute("border","1");
}


frame = window.top.document.getElementsByTagName("frame");
 
for (var j = 0; j < frame.length; j++) {
 frame[j].removeAttribute("noresize");
}
	
}

if (window.location.href.match(/http:\/\/www\.eksisozluk\.com/))
{
 resizable_frame();
}
