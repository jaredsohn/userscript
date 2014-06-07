// todoistmacros.user.js
//
// Copyright (c) 2007, Martin Johansson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Todoist Macros", and click Uninstall.
//
// ----------------------------------------------------------------------------
// WHAT IT DOES:
// Extends Todoist.com with two shortcut keys:
// P: adds a new project
// T: adds a new item (if the function is available)
// Thanks to to the GTD-Macro script(http://persistent.info/) 
// for the simulateclick function and the code to check for input areas
// ----------------------------------------------------------------------------
// HISTORY:
//  2007-05-04  0.1  Initial version.
//  2007-05-16 0.2 first functional version
// ----------------------------------------------------------------------------

// ==UserScript==
// @name          Todoist Macros
// @author        Martin Johansson <martin at johansson dot dk>
// @namespace     http://temporary.com/todoist
// @description   keyboard shortcuts for Todoist..
// @include       http://todoist.com/*
// @include       http://www.todoist.com/*
// @date          2007-05-04
// @version       0.2
// @GM_version    0.6.6.20060107.0
// ==/UserScript==/

// Add a key listener
window.addEventListener('keyup', keyListner, false);

function keyListner(event){
 
   if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
  
	if (event.keyCode == 80) {
		Todohandler('Add project');
		return true;
	}
	if (event.keyCode == 84) {
		Todohandler('Add item');
		return true;
	}
	
	return false;
}

function Todohandler(todoEvent){
	// Press the new project button - Add item
	var oAct = document.getElementsByTagName("a");
	for(var i=0;i < oAct.length;i++){
		if (oAct[i].innerHTML == todoEvent) {
			simulateClick(oAct[i],"click");
			return false;
		}
	}
	
}

function simulateClick(node, eventType) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent(eventType,
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         node);
    node.dispatchEvent(event);
}