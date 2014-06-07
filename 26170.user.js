// ==UserScript==
// @name           OWA Message Count
// @namespace      OWA.counter
// @include        
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	// Make sure we're in the inbox
	if (-1 !== document.title.indexOf('Inbox')) {
		// Get number of rows in message table body
		var numRows = $('table.lvw tbody:first').children().length;
		
		// If more than 3 rows
		if (numRows > 3) {
			// Set page title to include number of messages
			document.title = '(' + (numRows - 2) + ') ' + document.title;
		}
		// If only 3 rows (header + separator + ?)
		else {
			// If 3rd row isn't "no items" message
			if (1 != $('table.lvw tbody:first tr:last').children().length) {
				// Set page title to include number of messages
				document.title = '(' + (numRows - 2) + ') ' + document.title;
			}
		}
		
		// Refresh page in 60 seconds
		setTimeout('window.location = "https://sb-hq-exch01/owa/?ae=Folder";', 60000);
	}
}
