// ==UserScript==

// @name           Google Reader Background & Read

// @namespace      tag:Goldan

// @description    Modified script 'Google Reader Enter/Return Opens Item in New Tab' by Lenny Domnitser. Press 'b' to open item in a new tab (when collapsed). Press 'Enter' to open item in a new tab and collapse it (when expanded). Always marks item read when you press 'b' or 's' (for the purpose of counting it in Trends as read)

// @include        http://www.google.*/reader/view/*

// @include        https://www.google.*/reader/view/*

// ==/UserScript==



/*



(C) 2007 Denis Golomazov

Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html



History

-------


2007-09-30 - First stable version



*/



document.addEventListener('keypress', function(event) {

 	// when 'b'	 is pressed ->  open the item in a new background tab (intended to be used when the item is collapsed)
 	// when 'Enter' is pressed ->  open the item in a new background tab and collapse the item (intended to be used when the item is expanded)
	if ( (String.fromCharCode(event.which) == "b" && !event.ctrlKey) || event.keyCode == 13) {

    	var entry = document.getElementById('current-entry');

    	if(entry) {

      		var link = entry.getElementsByTagName('a')[0].href;

      		if(link) {

        		GM_openInTab(link);

		    }

	    }

	}
	
	// when 'b' or 's' is pressed -> mark item read, so that it will be counted in Trends as read
	// (it's achieved by imitation of pressing 'm' key)
	if ( (String.fromCharCode(event.which) == "b" || String.fromCharCode(event.which) == "s") && !event.ctrlKey) {
 		var ev = document.createEvent("KeyboardEvent");
		ev.initKeyEvent("keypress", true, true, null, false, false, false, false, 0x4D, 109)
		document.dispatchEvent(ev);
	}


}, false);
