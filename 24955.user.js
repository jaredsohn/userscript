// ==UserScript==
// @name          Google Reader - Mark Until Current As Read v 1.3
// @namespace     http://buzypi.in/
// @description   Mark all entries upto the current entry as read
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// ==/UserScript==

/* Modifications to this script is permitted provided this comment is retained in its entirety.
 * Copyright: Gautham Pai
 * Author: Gautham Pai
 * http://buzypi.in/
 */

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
}

function markUntilCurrentAsRead(){
	var currentElement = document.getElementById('current-entry');
   var allEntries = getAllEntries();

	for(var i=0;i<allEntries.length;i++){
		var entryIcon = getEntryIconDiv(allEntries[i]);
		if(allEntries[i] == currentElement){
			break;
		}
   	simulateClick(entryIcon);
	}
	simulateClick(currentElement.childNodes[0]);
}

function markAfterCurrentAsRead(){
	var currentElement = document.getElementById('current-entry');
   var allEntries = getAllEntries();

	for(var i=allEntries.length - 1;i>=0;i--){
		var entryIcon = getEntryIconDiv(allEntries[i]);
		if(allEntries[i] == currentElement){
			break;
		}
   	simulateClick(entryIcon);
	}
	simulateClick(currentElement.childNodes[0]);
}

function getEntryIconDiv(entry){
	var divs = entry.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		if(typeof(divs[i].className) != 'undefined' &&
				divs[i].className == 'entry-icons')
			return divs[i];
	}
	return null;
}

function getAllEntries(){
	var allDivs = document.getElementsByTagName('div');
	var allEntries = new Array();
	for(var i=0;i<allDivs.length;i++){		
		if(typeof(allDivs[i].className) != 'undefined' &&
				(allDivs[i].className.match('entry ') != null && allDivs[i].className.match("read") == null)
				|| allDivs[i].id == 'current-entry'){

			allEntries.push(allDivs[i]);
		}
	}
	return allEntries;
}

function keyPressEvent(event){
	var kcode = (event.keyCode)?event.keyCode:event.which;
	var ctrlKeyPressed =event.ctrlKey;
	var altKeyPressed =event.altKey;

	var k = String.fromCharCode(kcode);

	if(ctrlKeyPressed && altKeyPressed && (k == 'y' || k == 'Y')){
		markUntilCurrentAsRead();
	} else if(ctrlKeyPressed && altKeyPressed && (k == 'i' || k == 'I')){
		markAfterCurrentAsRead();
	}
} 

document.addEventListener("keypress", keyPressEvent, true);
