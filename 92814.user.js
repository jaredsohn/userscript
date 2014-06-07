// ==UserScript==
// @name           Photocase Twinklestop
// @namespace      micjan.photocase.twinclestop
// @description    Macht das das Benachrichtigungsschild oben rechts aufhört zu blinken wenn eine neue Nachricht eingetroffen ist.
// @include        http://www.photocase.*
// ==/UserScript==

document.getElementById("loggedIn").childNodes[11].className = "details messages";