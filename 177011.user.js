// ==UserScript==
// @name        Insert Link
// @namespace   http://localhost
// @include     http://www.gmot.nl/*
// @version     1.1
// ==/UserScript==

var member_bar = document.getElementsByClassName('memberbar')[1];
var div = document.createElement('div');
div.innerHTML = '<div>This is the link:<br><a href="http://www.gmot.nl/index.php?action=unread;all">LINK</a></div>';
member_bar.appendChild(div);