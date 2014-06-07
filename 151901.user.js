// ==UserScript==
// @name				OTRS Help Desk Free Text Linkify
// @author			Gavin Paolucci-Kleinow
// @namespace   http://userscripts.org/users/492181
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @match				http://*/otrs/index.pl?Action=AgentTicketFreeText*
// @include			http://*/otrs/index.pl?Action=AgentTicketFreeText*
// @description	Adds links next to URLs in free text fields in OTRS Help Desk
// @version			1.0.0
// ==/UserScript==
$('[name^="TicketFreeText"]').each(function() {
	var val = $(this).val();
	if (val.match(/^https?:/))
	{
		$('<a></a>').attr('href',$(this).val()).html($(this).val()).insertAfter(this);
	}
});
