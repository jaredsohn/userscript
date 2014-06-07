// ==UserScript==
// @name        Google gmail box list view email address
// @namespace   https://mail.google.com/mail/*
// @include     https://mail.google.com/mail/*
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$(function() {
	window.setInterval(function() {
		$('.yP,.zF').each(function() {
			if (!$(this).attr('marvan')) {
				$(this).append(' <span class="y2">&lt;'+$(this).attr('email')+'&gt;</span>').attr('marvan',1);
			}
		});
		$('.yY').css('width','400px');
	},1000);
});