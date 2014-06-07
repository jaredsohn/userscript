// ==UserScript==
// @name        basic font
// @description make the font of a webpage something simple like verdana
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// ==/UserScript==

var body = $(document.body);
body.css('font-family','verdana');
$('div').css('font-family','verdana');