// ==UserScript==
// @name        Mutton Button
// @namespace   http://userscripts.org/users/309848
// @description "PM Mutton" functionality for GPForums
// @include	http://www.gpforums.co.nz/thread*
// @include     http://www.gpforums.co.nz/showthread.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// @version     1
// ==/UserScript==

$(document).ready(function(){
	$('a.pButton').each(function(){
		if($(this).text() == "Send PM") {
			$(this).text('PM Mutton');
			$(this).attr('href','private.php?s=&action=newmessage&userid=4040');
			$(this).attr('title','Send Mutton a Private Message');
		}
	});
});