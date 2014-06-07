// ==UserScript==
// @name           Autofave
// @include        http://m.youtube.com/add_favorite?*
// ==/UserScript==

function clickOn(el){
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window);
	el.dispatchEvent(evt);
};

var button = document.querySelector("input[type='submit']");
clickOn(button);