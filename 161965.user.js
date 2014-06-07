// ==UserScript==
// @name        dabr - Tweet on Ctrl+Enter
// @namespace   http://mattstow.com/dabr
// @description Tweets on Ctrl+Enter
// @include     http://*dabr.co.uk/*
// @grant		none
// @version     1
// ==/UserScript==

var status = document.getElementById('status'),
	form = document.forms[0];

status.onkeypress = function(e) {
	if (e.ctrlKey && e.keyCode === 13)
		form.submit();
}