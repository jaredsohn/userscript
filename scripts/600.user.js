// TextareaResize
// version 0.2
// 2005-04-29 (last updated 2005-09-09)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html 
// 
// including features added by Matt Sherwood
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Textarea Resize", and click Uninstall.
//
// When typing in a textarea, press Ctrl-Enter to add rows and Ctrl-Space
//  to add columns.
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  
// Allows you to make textareas larger, by pressing Ctrl-Enter or Ctrl-Space
//  in a textarea.
// Textareas can be shrunk by pressing Shift-Ctrl-Enter and Shift-Ctrl-Space.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Textarea Resize
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Makes textareas larger when you press Ctrl-Enter or Ctrl-Space. Shift-Ctrl-Enter and Shift-Ctrl-Enter to reduce the size.
// @include         http://*
// ==/UserScript==

// todo: remember the size of textareas?
// todo: resize textarea to max size (that fits browser window). Loop adding rows until the bottom coordinates are too big.
// todo: make it work with dynamically updated pages such as Gmail
// todo: doesn't work for textareas that are sized using width and height, only cols and rows.


// Update (2005/09/09):
// Included Mark Pilgrim's fix for DeerPark:
// can't call scrollInView on an XPCNativeWrapper, must check for scrollIntoView function and call .wrappedJSObject.scrollIntoView (yuck)
 

var instrumentTextarea = function(textarea) {
    var centerTextarea = function() {
	if (textarea.scrollIntoView) {
	    textarea.scrollIntoView(false);
	} else {
	    textarea.wrappedJSObject.scrollIntoView(false);
	}
    };
    
    var textareaKeydown = function(e) {
        if (e.shiftKey && e.ctrlKey && e.keyCode == 13) {
	    // shift-ctrl-enter
            textarea.rows -= 1;
            centerTextarea();
        }
        else if (e.shiftKey && e.ctrlKey && e.keyCode == 32) {
	    // shift-ctrl-space
            textarea.cols -= 1;
            centerTextarea();
        }
        else if (e.ctrlKey && e.keyCode == 13) {
	    // ctrl-enter
            if (textarea.offsetHeight < window.innerHeight - 40) {
                textarea.rows += 1;
            }
            centerTextarea();
        }
        else if (e.ctrlKey && e.keyCode == 32) {
	   // ctrl-space
            if (textarea.offsetWidth < window.innerWidth - 40) {
                textarea.cols += 1;
            }
            centerTextarea();
        }
    };
    
    textarea.addEventListener("keydown", textareaKeydown, 0);
}

var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) 
{
   instrumentTextarea(textareas[i]);
}