// ==UserScript== 
// @name Amazon Wish List -- Comment Box Expansion
// @description Expand amazon.com wish list comment boxes
// @author John Bullock
// @version 0.1 (2006 05 16) 
// @include http://www.amazon.com/gp/registry/*
// ==/UserScript==

/*
Amazon.com provides a "wish list" feature that
permits users to take notes on books, films, 
etc.  But the text boxes in which those notes
are displayed are absurdly short: 40 characters
by default.  This script expands the comment
width to 140 characters.  
*/

var inputs = document.getElementsByTagName("input");
var alerttext = "";
for (i=0; i<inputs.length; i++) {
	if (inputs[i].name.indexOf("itemComment") != -1) { 
		inputs[i].size = 140;
	}
}
