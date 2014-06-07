// ==UserScript==
// @name          MsExchangeRefresh
// @namespace     http://jehiah.com/projects/greasemonkey
// @description	  Refresh your MS Exchange inbox in firefox and add a count of unread messages to the title
// @include       http://webmail.yourcompany.tld/exchange/*/Inbox/?*
// ==/UserScript==
// version 1.0 : 3/28

function countUnreadEmails(){
	els = document.getElementsByTagName("b");
	unread = (els.length - 4);
	// each unread message has 8 bold tags associated with it
	if (unread > 0){unread= unread/8;}
	// update the title of the parent frameset
	parent.document.title = "("+unread+") Inbox";
}
// run the count onload
countUnreadEmails();
// refresh in 2 minutes
setTimeout(function(){document.location.reload();},120000);
