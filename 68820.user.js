// ==UserScript==
// @name           infa theme hack
// @namespace      http://www.spec4u.net/projects/infa_hack.js
// @description    poprawki w wygladzie forum.
// @include        http://infa.cyberhosting.pl/*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://spec4u.net/projects/infa_cyber_style.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);

var cssNode2 = document.createElement('script');
cssNode2.type = 'text/javascript';
cssNode2.src = 'http://spec4u.net/projects/infa_cyber.js';
headID.appendChild(cssNode2);