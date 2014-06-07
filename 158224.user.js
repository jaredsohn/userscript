//composing various code snippets on the web.

// sources:
  //http://userscripts.org/topics/1383#posts-5343
  //show ed2k links in a window (javascript) from http://dduniverse.net
  //https://developer.mozilla.org/en-US/docs/Mozilla_event_reference
  //https://developer.mozilla.org/en/docs/DOM/element.addEventListener

// USAGE and detailed description:
  // this script is see description. It needs some knowledge by the user, in fact he should 
  // include the pages where the script must work, via "greasemonkey manage scripts".
  // For example: 
  //   from the web page http://en.wikipedia.org/wiki/ASCII
  //   the user select http://en.wikipedia.org/wiki/ASCII and then add it
  //   to greasemonkey, with "manage script->script settings->user include" .
  //   Then every time he goes on http://en.wikipedia.org/wiki/ASCII
  //   the script will be turned on
  // check function (in the code below) "on window menu" to see the shortcuts!

// ==UserScript==
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// @name           copy multiple links
// @namespace      Pierfag
// @description    Copy multiple links with mouse and keyboard clicks, then show them in a window
// @version        0.1

// on which urls script works
  // test regexp
    // include        /\.quora\.com/
// @exclude       *
// @include       thisSiteDoesntExists
  //by default, doesn't work on any site on the web
  
// ==/UserScript==

//notes for me
  // # e.preventDefault and e.stopPropagation seem to be a default "good" use after an event.
  // # on keydown only one key is recorded plus some standard key (already used by Firefox) as ctrl,
  //   shift,alt. I don't know listeners for key composition so i'll build some homemade functions

window.addEventListener("keydown", keyDownOnWindow, true);

//where to store links
var links = new Array();
var emptyPosLinks = 0;

var keyCombo = "";

reloadListeners();

function reloadListeners(){
	var x = document.links;
	for (i=0; i < x.length; i++) {
		//x[i].addEventListener("mousedown", msDown, true);
		//x[i].removeEventListener("contextmenu", contextMenu, true);
		  //the same of the add, so it can remove the right item
		  //to avoid duplicates (if i understood correctly, JS on GM have no "hasEventListener" check)
		if ( typeof(x[i].contextmenu) == "function"){
			continue; //it has already the listener, skip!
		}
		x[i].addEventListener("contextmenu", contextMenu, true);
		  //then readd the item
		//x[i].addEventListener("click", msClick, true);
		//x[i].addEventListener("mouseup", msUp, true);
	}
}

function resetArrayLinks(){
	links = new Array();
    emptyPosLinks = 0;
}

function resetKeyCombo(){
	keyCombo = "";	
}

//copy a link when a key shortucut plus a mouse button is pressed
//function msDown(e) {
function contextMenu(e) {
	if (e.button == 2 && e.ctrlKey && e.altKey) {
		//if mouse right button (given by contextmenu) plus ctrl+alt (Copy Link) are pressed
	//if (e.keyCode == 67 && e.keyCode == 76) {
		//if mouse right button (given by contextmenu) plus c+l (Copy Link) are pressed
		e.preventDefault();
		e.stopPropagation();
		//alert(e.target);
		
		//save the link
		links[emptyPosLinks] = e.target;
		emptyPosLinks++;
	}
}

// only for left-click
//function msClick(e) {
//  e.preventDefault();
//  e.stopPropagation();
//  alert(e.type + " : " + e.button);
//}

//function msUp(e) {
//	if (e.button == 1) {
//		e.preventDefault();
//		e.stopPropagation();
//		alert(e.type + " : " + e.button);
//	}
//}

//open a new window given a key shortcut or reload listeners and other stuff
//(for that pages that add informations/html if a button is pressed)
//note: for normal keys, only one is recorded so we need to save each key
function keyDownOnWindow(e){
	//alert("bla");
	
	if (( e.keyCode == 110 || e.keyCode == 78)){
		//if s/S is pressed
		keyCombo = keyCombo + "s";
	}
	
	if (( e.keyCode == 115 || e.keyCode == 83)){
		//if n/N is pressed
		keyCombo = keyCombo + "n";
	}
	
	if (( e.keyCode == 114 || e.keyCode == 82)){
		//if r/R is pressed
		keyCombo = keyCombo + "r";
	}
	
	if (( e.keyCode == 108 || e.keyCode == 76)){
		//if l/L is pressed
		keyCombo = keyCombo + "l";
	}
	
	if (( e.keyCode == 99 || e.keyCode == 67)){
		//if c/C is pressed
		keyCombo = keyCombo + "c";
	}
	
	if (keyCombo.length > 2){
		//something don't wanted
		resetKeyCombo();
	}
	
	//show New
	if (keyCombo == "sn" || keyCombo == "ns" ){
		e.preventDefault();
		e.stopPropagation();
		  //only if an useful combination is active!
		  
		showLinksInAWindow();
		resetKeyCombo();
	}
	
	//reload listeners
	if (keyCombo == "rl" || keyCombo == "lr" ){
		e.preventDefault();
		e.stopPropagation();
		  //only if an useful combination is active!
		  
		alert("Reload event listeners on links!");
		  
		reloadListeners();
		resetKeyCombo();
	}
	
	//reset link collection
	if (keyCombo == "rc" || keyCombo == "cr" ){
		e.preventDefault();
		e.stopPropagation();
		  //only if an useful combination is active!
		  
		alert("Reset link collection!");
		  
		resetArrayLinks();
		resetKeyCombo();
	}
	
//    if (( e.keyCode == 110 || e.keyCode == 78) && ( e.keyCode == 115 || e.keyCode == 83) ){
//		//if s/S+n/N is pressed (Show New)
//        e.preventDefault();
//		e.stopPropagation();
//		//alert(e.type + " : " + e.keyCode);
//		
//		showLinksInAWindow();
//    }
//	
//	//reload listeners
//	if (( e.keyCode == 114 || e.keyCode == 82) && ( e.keyCode == 108 || e.keyCode == 76) ){
//		//if r/R+l/L is pressed (Reload Listener)
//        e.preventDefault();
//		e.stopPropagation();
//		//alert(e.type + " : " + e.keyCode);
//		
//		alert("Reload event listeners on links!");
//		
//		reloadListeners();
//    }
//	
//	//reset the links collection
//	if (( e.keyCode == 114 || e.keyCode == 82) && ( e.keyCode == 99 || e.keyCode == 67) ){
//		//if r/R+c/C is pressed (Reset Collection)
//        e.preventDefault();
//		e.stopPropagation();
//		//alert(e.type + " : " + e.keyCode);
//		
//		alert("Reset link collection!");
//		
//		resetArrayLinks();
//    }
}

// construct the new window to show the links
function showLinksInAWindow(){
	var windowForLinks = window.open("", "links", "width=800,height=600,scrollbars=1");
	windowForLinks.document.title = "copied links";
	var textWindowForLinks = windowForLinks.document.body.innerHTML; //pick the html parts where the script will write
	windowForLinks.document.write(textWindowForLinks + "<pre>");
	for (var i=0; i<links.length; i++){
		windowForLinks.document.write(links[i]+"\n");
	}
	windowForLinks.document.write("</pre>");
	windowForLinks.document.close();
}