// ==UserScript==
// @name        black on white
// @description make the background white and text black
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// ==/UserScript==

var body = $(document.body);
body.css('background-color','#fff');
body.css('color','#000');
$('div').css('background-color','#fff');