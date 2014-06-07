// ==UserScript==
// @name           Facepunch subtle "postbitold yourpost"
// @description    Adds more subtlety to the div class "postbitold yourpost". Currently your entire post becomes green, whereas now it is replaced with a green gradient similar to the "new post" blue one. Uses the same colour scheme.
// @include        http://www.facepunch.com/showthread.php?t=*
// @include        http://www.facepunch.com/showthread.php?p=*
// ==/UserScript==

var style="div.yourpost {background: #FFFFFF url(http://i39.tinypic.com/34j274o.png) repeat-y scroll 0 0}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);