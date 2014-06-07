// ==UserScript==
// @author		   Dotayuri
// @name           Change webpage favicon.
// @description    Change any page favicon.
// @email		   Dotayuri@hotmail.com
// @include        http://www.google.com/
// ==/UserScript==


var Favicon = document.createElement('link');
Favicon.setAttribute('rel', 'shortcut icon');
Favicon.setAttribute('href', 'http://dotayuri.com/favicon.ico');
var head = document.getElementsByTagName('head')[0];
head.appendChild(Favicon);