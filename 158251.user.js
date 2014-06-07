// ==UserScript==
// @name       Sultan Font
// @namespace  Prash.met
// @version    1.1
// @description  Auto adds font
// @match      http://*hackforums.net/*
// @copyright  2013
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

var tags = "[font=Tahoma]\n\n[/font]";
var box = $('textarea');

if (box.val() != '') {
	box.val(box.val() + "\n\n" + tags);
}
else {
	box.val(tags);
}