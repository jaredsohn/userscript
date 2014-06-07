// Author: James Sofra (James.Sofra@gmail.com)
// 
// ==UserScript==
// @name           OWA Unread Message Counter
// @namespace      OWA.unreadmsgcounter
// @description    Builds upon "OWA Message Count" script by Dan Hulton (http://userscripts.org/scripts/show/26170), this script counts all unread messages in the currently viewed messages of the OWA 2007 inbox. It also refreshes the page every minute whislt in the inbox.
// @include  *
// ==/UserScript==

var resfreshIntevalInMinutes = 1

// Add jQuery
var JQInclude = document.createElement('script');
JQInclude.src = 'http://jquery.com/src/jquery-latest.js';
JQInclude.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(JQInclude);

// Check if jQuery's loaded
function waitForJQuery() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJQuery,100); }
	else { $ = unsafeWindow.jQuery; runJQuery(); }
}
waitForJQuery();
	
// All your GM code must be inside this function
function runJQuery() {

	// Make sure we're in the inbox
	if (-1 !== document.title.indexOf('Inbox')) {
		// Get number of rows in message table body
		var unreadMessages = $(".sI[alt='Message: Unread']");
		var numRows = unreadMessages.length;
		var firstUnreadIndex =  $(".sI").index($(".sI[alt='Message: Unread']:first"));
		var sender = $("table.lvw tbody tr").eq(firstUnreadIndex + 3).text();
		document.title = '(' + (numRows) + ') Inbox - ' + $.trim(sender);
		
		// Refresh page
  		window.setTimeout((function(){
    			unsafeWindow.chkMsgs();
      			}), resfreshIntevalInMinutes * 60000);
	}

}
