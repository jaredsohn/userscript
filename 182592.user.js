// ==UserScript==
// @name				OTRS Help Desk Full URL Links
// @author			Gavin Paolucci-Kleinow
// @namespace   http://userscripts.org/users/492181
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @match				http://*/otrs/index.pl?Action=AgentTicket*
// @include			http://*/otrs/index.pl?Action=AgentTicket*
// @description	Makes text in links in tickets the full URL in OTRS Help Desk
// @version			1.0.0
// ==/UserScript==
$('a:contains("[..]")').each(function() {
	$(this).html($(this).attr('href'));
});
