// ==UserScript==
// @name           Filter tickets
// @namespace      Assembla
// @include        https://www.assembla.com/followed_tickets
// @description    In the 'My followed tickets' page of Assembla, this script adds commands in the 'User Script Commands' menu to filter tickets by status.
// ==/UserScript==

var $ = unsafeWindow.jQuery;

GM_registerMenuCommand('Show New', function(){
	$('.ticket_status_id:not(:contains("New"))').parent().hide();
	$('.ticket_status_id:contains("New")').parent().show();
});

GM_registerMenuCommand('Show Accepted', function(){
	$('.ticket_status_id:not(:contains("Accepted"))').parent().hide();
	$('.ticket_status_id:contains("Accepted")').parent().show();
});

GM_registerMenuCommand('Show Test', function(){
	$('.ticket_status_id:not(:contains("Test"))').parent().hide();
	$('.ticket_status_id:contains("Test")').parent().show();
});
