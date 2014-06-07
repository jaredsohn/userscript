// ==UserScript==
// @name          Facebook Message.php Redirect
// @namespace     http://www.eberhartweb.com/seth/scripts
// @description	  Automatic Redirect from "Message Sent" to "Mailbox"
// @author       	seth
// @include       http://*.facebook.com/message.php
// @version		0.1
// @date         2006-10-03
// ==/UserScript==

var refresh = 0;
	
window.setTimeout(
	function()
	{
		window.location="http://facebook.com/mailbox.php" ;
	},
	refresh
) ;

