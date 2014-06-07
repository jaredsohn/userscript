// ==UserScript==
// @name           Mouse Gestures
// @namespace      http://userscripts.org/users/79967
// @description	   Provides Mouse Gestures, useful for e.g. Google Chrome
// @author         Silvan
// @include        *
// ==/UserScript==

var BTN_RIGHT = 2;
var SENSITIVITY = 20; //Pixels moved until gesture is registered
var startX;
var startY;
var gesture = "";
var preventContextMenu = false;
var gestures = {
	u : function(){if (unsafeWindow.getSelection && unsafeWindow.getSelection().toString().length) {GM_openInTab(((unsafeWindow.getSelection().toString().match(/^https?:/i))?'':'http://')+unsafeWindow.getSelection())} else GM_openInTab('about:blank')},
	d : function(){unsafeWindow.close()},
	l : function(){unsafeWindow.history.back()},
	r : function(){unsafeWindow.history.forward()},
	ud : function(){unsafeWindow.location.reload()},
	udu : function(){unsafeWindow.location.reload(true)},
}

function mgMouseDown(e)
{
	if(e.button == BTN_RIGHT) {
		startX = e.clientX;
		startY = e.clientY;
		gesture = "";
		unsafeWindow.addEventListener("mousemove",mgMouseMove,true);
		unsafeWindow.addEventListener("mouseup",mgMouseUp,true);
	}
}

function mgMouseMove(e)
{
	checkMove(startY - e.clientY, 'u', e);
	checkMove(e.clientX - startX, 'r', e);
	checkMove(e.clientY - startY, 'd', e);
	checkMove(startX - e.clientX, 'l', e);
}

function checkMove(p, t, e)
{
	if (p >= SENSITIVITY) {
		startX = e.clientX;
		startY = e.clientY;
		if (gesture[gesture.length-1] != t) {
			gesture += t;
		}
	}
}

function mgMouseUp(e)
{
	preventContextMenu = false;
	if (gestures[gesture]) {
		gestures[gesture]();
		preventContextMenu = true;
	}
	unsafeWindow.removeEventListener("mousemove",mgMouseMove,true);
	unsafeWindow.removeEventListener("mouseup",mgMouseUp,true);
}

function mgContextMenu(e)
{
	if(preventContextMenu)
		e.preventDefault();
}

unsafeWindow.addEventListener("mousedown",mgMouseDown,true);
unsafeWindow.addEventListener("contextmenu",mgContextMenu,true);