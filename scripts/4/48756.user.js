// ==UserScript==
// @name           XPath Shortcut and Examples
// @namespace      http://userscripts.org/users/23652
// @description    Contains xpath functions and examples
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// XPath by JoeSimmons
function xp(exp, t, n) {
var r = document.evaluate((exp||"//body"),(n||document),null,(t||6),null);
if(t && t>-1 && t<10) switch(t) {
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
} return r;
}

var first_link = xp("//a", 9);
alert('First Link: ' + first_link.href);

var first_text = xp("//div[1]", 2);
alert('First Div Text: ' + first_text);

var iframes = xp("//iframe", 3);
alert('# of iframes on the page: ' + (iframes===true?iframes:'0'));