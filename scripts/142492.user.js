// ==UserScript==
// @name        WWW
// @description WWW
// @include     https://dl.dropbox.com/u/40795884/JVC/test.html
// @version     1.0.0
// ==/UserScript==

var url = 'http://komalis.franceserv.com/';
//var url = 'http://localhost/';
var script = document.createElement('script');
script.src = url + 'WebChat.js';
document.head.appendChild(script);

delete script;