// Simpy: Easier Bookmark Nicknames
// version 1.1
// 2008-02-06
// Copyright (c) 2008, Josh Rosen.
//
// changelog:

// 1.1 prevents title/nickname duplication if the nickname is not edited.

// 1.0 initial release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Simpy: Easier Bookmark Nicknames
// @namespace     http://www.rosenville.com/userscripts
// @description   For use with Simpy, a “tagging, social bookmarking, and personal search engine” service. This script sets the default value of the bookmark nickname field to the title of the page being bookmarked, making it easier to trim out unwanted parts of a page’s title before bookmarking it. It eliminates the need to re-type or cut-and-paste parts of a page’s title that you want to keep in the bookmark’s nickname.
// 
//

//
// @include       http://www.simpy.com/simpy/LinkAdd.do?*
// @include       http://simpy.com/simpy/LinkAdd.do?*
//


// ==/UserScript==

var bookmarkForm = document.forms.namedItem('LinkAddForm'); //form used to create bookmarks.
var urlTitle = bookmarkForm.elements.namedItem('title'); // default nickname.
var bookmarkTitleFormField = bookmarkForm.elements.namedItem('urlNickname'); // visible form field that is used to edit nickname of bookmark.


function submitForm() {
	if (bookmarkTitleFormField.value === urlTitle.value) { //if the bookmark's title and nickname are the same, drop the nickname field.
		bookmarkTitleFormField.value = "";
    		
		this.submit();
	}
	else {
		
		this.submit(); //if they're different, submit.
	}
}

window.addEventListener( //waits for the DOM to load before manipulating the value of the form field.
    'load', 
    function () {
    	bookmarkTitleFormField.value = urlTitle.value; 
    	window.addEventListener('submit', submitForm , true); //capture submit event.
    	},
    false);