// ==UserScript==
// @name	Character Reveal
// @namespace	http://programple.com/
// @version	0.1
// @description	  Reveals characters in password fields.
// @match	http://*
// @match	https://*
// @copyright	2012=, Matthew Rhoden
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

jQuery{function($)	{
	document.getElementById($('input[type=password]').attr('id')).setAttribute('type', 'text')
});