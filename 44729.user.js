// ==UserScript==
// @name           PlanetRomeo Forum Frames Resizeable
// @namespace      http://my.guys4men.com
// @include        http://www.gayromeo.com/*/club.php*
// @include        http://www.gayromeo.com/*/forum_index.php*
// @include        http://www.planetromeo.com/*/club.php*
// @include        http://www.planetromeo.com/*/forum_index.php*
// @include        http://83.98.143.20/*/club.php*
// @include        http://83.98.143.20/*/forum_index.php*
// ==/UserScript==

var framesets = document.getElementsByTagName("frameset");
 
for (var i = 0; i < framesets.length; i++) {
	framesets[i].setAttribute("frameborder","2");
	framesets[i].setAttribute("border","2");
}

var frames = document.getElementsByTagName("frame");
 
for (var i = 0; i < frames.length; i++) {
	frames[i].removeAttribute("noresize");
	frames[i].setAttribute("scrolling","auto");
}
