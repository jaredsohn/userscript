// ==UserScript==
// @name           Uncheck Boxes
// @namespace      http://bowierocks.com/
// @version        2.01
// @description    Unchecks check boxes that are checked by default.
// @include        http://*
// @include        https://*
// ==/UserScript==
/*
Original by Rocky Neurock
Modifications by lambroger 5/14/2008
Changelog:
- 5/14/2008 encapsulated code in function so it does cause untold chaos.
- 5/14/2008 added GM_registerMenuCommand to reference new function wrapper. See last line for command :)
*/

function unCheckEm() {
	var cBoxes=document.getElementsByTagName('input');

	for (var i=0; i < cBoxes.length; i++) 
    if (cBoxes[i].type=="checkbox") 
			cBoxes[i].checked=false;

}

GM_registerMenuCommand("Uncheck boxes",unCheckEm);