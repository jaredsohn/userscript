// ==UserScript==
// @name           hihi2-Beta
// @namespace      unknown
// @description    something fun2.
// @include        http://*lordsoflegend.com/*/user_mercenaries_sec*
// ==/UserScript==

var theSel, altSel;
altSel="50";
theSel = document.getElementByvalue('10');
if (theSel) {
altSel = document.createTextNode(theSel.alt);
theSel.parentNode.replaceChild(altSel, theSel);
}
