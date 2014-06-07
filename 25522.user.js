// ==UserScript==
// @name          Google Reader - "Mark as read" keyboard shortcuts
// @description   Three shortcuts that use existing google shortcuts to mark items as read. The first marks an item as read in list view and then moves to the next item. The second marks all items above the currently selected item as read. The third marks all items below the currently selected as read.
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// ==/UserScript==

function simKeyPress(node) {
    var e = node.ownerDocument.createEvent("KeyboardEvent");
    //alert(node.parentNode.parentNode.className);
    if (node.parentNode.parentNode.className != 'entry overflow-settable read' && node.parentNode.parentNode.className != 'entry overflow-settable expanded read' && node.parentNode.parentNode.className != 'entry overflow-settable read expanded') {
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 77, 0x4D);
	node.dispatchEvent(e);
    }
    e.initKeyEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
    node.dispatchEvent(e);
}

function simKeyPressBack(node) {
    var e = node.ownerDocument.createEvent("KeyboardEvent");
    //alert(node.parentNode.parentNode.className);
    if (node.parentNode.parentNode.className != 'entry overflow-settable read' && node.parentNode.parentNode.className != 'entry overflow-settable expanded read' && node.parentNode.parentNode.className != 'entry overflow-settable read expanded') {
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 77, 0x4D);
	node.dispatchEvent(e);
    }
    e.initKeyEvent('keypress', true, true, window, false, false, false, false, 80, 0x50);
    node.dispatchEvent(e);
}

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");
   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
}

function markAsReadAndMoveOn(){
    var currentElement = document.getElementById('current-entry');
    var entryIcon = getEntryIconDiv(currentElement);
    simKeyPress(entryIcon);
}

function markUntilCurrentAsRead(){
    var currentElement = document.getElementById('current-entry');
    var allEntries = getAllEntries();

    for(var i=0;i<allEntries.length;i++){
	var entryIcon = getEntryIconDiv(allEntries[i]);
	var e = entryIcon.ownerDocument.createEvent("KeyboardEvent");
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 80, 0x50);
	entryIcon.dispatchEvent(e);
	if(allEntries[i] == currentElement){
	    break;
	}
    }

    for(var i=0;i<allEntries.length;i++){
	var entryIcon = getEntryIconDiv(allEntries[i]);
	simKeyPress(entryIcon);
	if(allEntries[i] == currentElement){
	    break;
	}
    }
}

function markUntilAfterAsRead(){
    //alert("after");
    var currentElement = document.getElementById('current-entry');
    var allEntries = getAllEntries();

    for(var i=allEntries.length - 1;i>0;i--){
	var entryIcon = getEntryIconDiv(allEntries[i]);
	var e = entryIcon.ownerDocument.createEvent("KeyboardEvent");
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
	entryIcon.dispatchEvent(e);
	if(allEntries[i] == currentElement){
	    break;
	}
    }

    for(var i=allEntries.length - 1;i>0;i--){
	var entryIcon = getEntryIconDiv(allEntries[i]);
	simKeyPressBack(entryIcon);
	if(allEntries[i] == currentElement){
	    break;
	}
    }
}

function getEntryIconDiv(entry){
    var divs = entry.getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){
	if(typeof(divs[i].className) != 'undefined' && divs[i].className == 'entry-icons') {
	    return divs[i];
	}
    }
    return null;
}

function getAllEntries(){
    var allDivs = document.getElementsByTagName('div');
    var allEntries = new Array();
    for(var i=0;i<allDivs.length;i++){		
	if(typeof(allDivs[i].className) != 'undefined' &&
	   allDivs[i].className == 'entry'
	   || allDivs[i].id == 'current-entry'
	   || allDivs[i].className == 'entry overflow-settable' 
	   || allDivs[i].className == 'entry overflow-settable read'
	   || allDivs[i].className == 'entry overflow-settable expanded'
	   || allDivs[i].className == 'entry overflow-settable expanded read'
	   || allDivs[i].className == 'entry overflow-settable read expanded'
	  ){
	    allEntries.push(allDivs[i]);
	}
    }
    return allEntries;
}


function keyPressEvent(event){
    var kcode = (event.keyCode)?event.keyCode:event.which;
    var k = String.fromCharCode(kcode);
    if(k == ','){
    	markAsReadAndMoveOn();
	event.preventDefault();
    } else if (k == 'U') {
	markUntilCurrentAsRead();
	event.preventDefault();
    } else if (k == 'I') {
	markUntilAfterAsRead();
	event.preventDefault();
    }
}

document.addEventListener("keypress", keyPressEvent, true);