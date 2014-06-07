// ==UserScript==
// @name        DARVA EDI
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @namespace   http://userscripts.org/users/523948
// @include     https://pro.darva.com/autoweb/toEdi.do*
// @version     1.0
// ==/UserScript==
$('span').each(function()
{
	$(this).prepend($(this).attr('title')+' - ')
})