// ==UserScript==
// @name           Mailinator Butler
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Make Mailinator easier to use, by linking the primary and alternate addresses, thus making them copyable via the context menu.
// @include        http://www.mailinator.com/maildir.jsp?email=*
// @include        http://mailinator.com/maildir.jsp?email=*
// ==/UserScript==

var primaryEl=document.getElementById('mainCol').getElementsByTagName('h2')[0];
var secondaryEl=document.getElementById('mainCol').getElementsByTagName('span')[0];

var primary=primaryEl.textContent.match(/.*\s(\w+)\s/)[1];
primaryEl.innerHTML="Inbox for: "+
	"<a href='mailto:"+primary+"@mailinator.com'>"+primary+"@mailinator.com</a>";

var secondary=secondaryEl.textContent.match(/.*:\s+(.*)\s+@/)[1];
secondaryEl.innerHTML="Alternate address: "+
	"<a href='mailto:"+secondary+"@mailinator.com'>"+secondary+"@mailinator.com</a>";
