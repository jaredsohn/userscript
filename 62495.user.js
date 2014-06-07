// ==UserScript==
// @name           Fuck AddThis
// @namespace      #aVg
// @description    Removes one of the worst pieces of shit to ever happen to the Internet since bonzi buddy.
// @include        *
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var a=document.getElementsByClassName("addthis"), b;
for(var i = a.length - 1; i>=0; --i) {
	b=a[i];
	b.parentNode.removeChild(b);
}