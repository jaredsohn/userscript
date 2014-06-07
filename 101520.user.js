// ==UserScript==
// @name           Shacknews Bracket Fixer
// @namespace      http://userscripts.org/users/72838
// @description    Changes the < and > characters to unicode before posting
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include        http://www.shacknews.com/chatty*
// @match	   http://www.shacknews.com/chatty*
// ==/UserScript==

$('#frm_body').live('keyup', function(){
	$('#frm_body').val( $('#frm_body').val().replace(/</g, '\u2039'));
	$('#frm_body').val( $('#frm_body').val().replace(/>/g, '\u203A'));
});