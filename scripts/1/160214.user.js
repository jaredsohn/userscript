// ==UserScript==
// @name Wolfram|Alpha Input Bar Focus
// @namespace http://davidtsai.net78.net/
// @description Sets input focus on the input bar on Wolfram|Alpha after page loads 
// @include http://www.wolframalpha.com/input/*
// @version 1.0
// @run-at document-end
// ==/UserScript==

var i = document.getElementById("i");
i.focus();
i.select();