// ==UserScript==
// @name           Form data fields fix for dark UI theme users
// @namespace      *
// @description    For users of dark themes, if the default text and background text on input fields are hard to read this fixes it.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(window).ready(function(){
	cssFix = '<style type="text/css">input, textarea, select { background-color: #fff; color: #000; }</style>';
	$(cssFix).insertAfter('title');
});