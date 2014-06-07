// ==UserScript==
// @name           7Chan - Frame Remove
// @namespace      x
// @include      http://7chan.org/*
// ==/UserScript==

var mainframe = document.getElementById('main');
window.location = mainframe.src;