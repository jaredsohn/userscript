// ==UserScript==
// @name           todoist
// @namespace      http://userscripts.org/users/mhenry1384
// @description    Fix todoist
// @include        http://todoist.com/*
// @include        https://todoist.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var hideQueryBox = false;

function addGlobalStyle(css) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	head.appendChild(style);
	try{
	style.appendChild(document.createTextNode(css));
	style.innerHTML = css;
	}catch(e) {
	}
}

// Shrink the actual todo lists so you get a scroll bar instead of the whole page (including your projects) scrolling
addGlobalStyle('ul#project_editor.items {height: 550px; overflow-y: auto;}'); 
// Put the img arrow on the line above.  This is a crappy solution but I don't have anything better without some serious 
// hackery.
// The problem is that todoist wants to put the arrow with a -18px margin-left.
// You can't have a -18px margin-left on the arrows with overflow-y:auto on the items.  The arrow disappears.  
// One possiblity would be to shift everything over 18px except the arrows.  That's probably
// the best solution, but I couldn't get that to look right.
// Another possibility is to crop the img.  It would look fine shifted to the left 9px if it didn't have all that 
// whitespace in the actual image.  In order to crop the img properly we'd have to enclose it in a div with overflow:hidden
// or else completely replace the img src.  The problem is what to do when a new arrow is created - we'd have to have our
// script constantly monitor for img.arrows and fix them when they appear.  It's a big pain in the butt.
// Anyway I don't really use hierarchical lists so to heck with it.
addGlobalStyle('img.arrow {float:none; margin-left: -5px;'); 
//addGlobalStyle('img.arrow + table {margin-left: -10px;'); 
// Do the same for the Query start page
addGlobalStyle('#agenda_view {height: 550px; overflow-y: auto;}');
if (hideQueryBox) {
	addGlobalStyle('#agenda li {display: none;}');
}
// Remove the footer - wasted space
addGlobalStyle('#bottom {display: none;}');
