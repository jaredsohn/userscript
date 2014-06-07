// ==UserScript==
// @name           Close Tab on right double click
// @namespace      henning.bocklage.com
// @description    Right Double Click on a Window closes the Tab  
// @version		 1.0
// @include        http://*
// ==/UserScript==

// This script is made for all the Lotus Notes users out there, 
// that are so used to the "Right Double Click closes window" feature,
// that they don't want to miss it for the Firefox.
// This script basically closes the tab if you double-click on it
// (no matter if it's a left-dblclick or a right-dblclick). 
// You have to open "about:config" before and set 
// "dom.allow_scripts_to_close_windows" to "true".
// Pls comment for hints or tipps (specially if you know something
// to prevent it from closing if you left-dblclick). 



// Event Listener, waiting for a dblclick to call the CloseTheTab function
document.addEventListener('dblclick', CloseTheTab, false);


// function to close the tab that you are clicking on
function CloseTheTab(){
	window.open('', '_self', '');
	window.close();
} 