// ==UserScript==
// @name           Google Footer Cleaner
// @description    Removes some footer stuff off the Google homepage, such as advertisements and the copyright stuff.
// @include        http://www.google.co.uk/
// ==/UserScript==

var style="span#footer { display: none }; #prm { display: none };";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);