// ==UserScript==
// @name        Mailbox_Fix
// @namespace   Consciousness [1365950] - Onions @ irc.torn.com:6667
// @description O_o
// @include     http://www.torn.com/messages.php?action=read&XID=*
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$('th').filter(function () { return $(this).html()=="Previous Conversation"}).parent().parent().next().find('tr').each(function (i) {
	if (i>15) $(this).hide();
	console.log(i + ' - ' + $(this).html());
});