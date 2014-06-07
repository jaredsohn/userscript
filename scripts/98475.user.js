// ==UserScript==
// @name           YOSPOS CSS Remover
// @namespace      http://zachwalton.com
// @description    Removes the custom CSS from http://forums.somethingawful.com/forumdisplay.php?forumid=219
// @include        http://forums.somethingawful.com/forumdisplay.php?forumid=219*
// @include        http://forums.somethingawful.com/showthread.php*
// @run-at         document-start 
// ==/UserScript==

var css219;
css219=document.getElementsByTagName("link")[4];

if (css219.getAttribute('href').indexOf("219.css")!=-1) {
	css219.parentNode.removeChild(css219);
}