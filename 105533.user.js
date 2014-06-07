// ==UserScript==
// @name           AJAXChat Chromefix Scroll
// @namespace      http://laughdonor.com/
// @description    Scrolls Down on chat, and cleans it up.
// @include        http://*/chat/*
// ==/UserScript==

setTimeout( "document.getElementById('styleSelection').onchange(); if( document.getElementById('chatList') != null ) setInterval( \"document.getElementById('chatList').scrollTop = document.getElementById('chatList').scrollHeight;\", 1000 );", 4000 );
