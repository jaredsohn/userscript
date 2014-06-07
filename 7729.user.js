// ==UserScript==
// @name           Focus on the search
// @namespace      http://www.fladder.se/greasemonkey/sf
// @description    Focus input on the search textfield if visible
// @author         Matti Ryhanen
// @version        1.0
// ==/UserScript==
/*
Copyright (C) 2007 Matti Ryhanen.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

(function(){

if(!window.location.hash)
{
	var input, textInputs, elm, size, delta ,pos;
	textInputs = document.evaluate("//input[contains(@name, 'search') or contains(@name, 'q') or contains(@name, 'keywords')]",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null );
	
	size =  [window.innerHeight,window.innerWidth];
	delta = [window.pageYOffset,window.pageXOffset];
	
	for ( var i = 0; i < textInputs.snapshotLength; i++ ) {
		input = textInputs.snapshotItem(i);
		if ( input.type != "text" ) continue;
		
		pos = [0,0];
		elm = input;
		do {
			pos[0] += elm.offsetTop;
			pos[1] += elm.offsetLeft;
			elm = elm.offsetParent;
		} while (elm);
		   
		if (pos[0] > delta[0] && pos[0] < delta[0]+size[0] && 
		 	pos[1] > delta[1] && pos[1] < delta[1]+size[1]) {
			input.focus();
			return;
		}
	}
}
})();