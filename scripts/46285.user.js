// ==UserScript==
// @name           Full Window SQLinform
// @namespace      fullwindowSQLinform.userscript
// @include        http://www.sqlinform.com/
// ==/UserScript==
var app = document.getElementsByTagName('applet')[0];
app.setAttribute('height', '100%');

document.body.innerHTML = app.parentNode.innerHTML;