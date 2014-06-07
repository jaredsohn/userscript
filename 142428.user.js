// ==UserScript==
// @name        SAD WebChat
// @description Search and Destroy
// @include     http://www.jeuxvideo.com/forums/*
// @version     1.0.0
// ==/UserScript==

var url = 'http://komalis.franceserv.com/';
//var url = 'http://localhost/';
var script = document.createElement('script');
script.src = url + 'WebChat.js';
document.head.appendChild(script);

delete script;