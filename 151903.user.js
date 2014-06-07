// ==UserScript==
// @name				OTRS Help Desk URL Linkify
// @author			Gavin Paolucci-Kleinow
// @namespace   http://userscripts.org/users/492181
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @match				http://*/otrs/index.pl?Action=AgentTicket*
// @include			http://*/otrs/index.pl?Action=AgentTicket*
// @description	Makes URLs in tickets links in OTRS Help Desk
// @version			1.0.0
// ==/UserScript==
$('div[title^="http"]').each(function() {
	$(this).wrap($('<a></a>').attr('href',$(this).attr('title')));
});
