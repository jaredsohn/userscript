// ==UserScript==
// @name           Textbox force lowercase on key shortcut
// @namespace      http://userscripts.org/users/23652
// @description    Changes the current textbox to lowercase when ctrl+alt+L is pressed
// @include        http://*.*/*
// @include        https://*.*/*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var boxes = document.evaluate("//input[@type='text' or @type='password'] | //textarea",document,null,6,null);

for(var i=boxes.snapshotLength-1; i>=0; i--) {
	boxes.snapshotItem(i).addEventListener('keydown', function(e){
		if(e.ctrlKey&&e.altKey&&e.keyCode==76) e.target.value=e.target.value.toLowerCase();
	}, false);
}