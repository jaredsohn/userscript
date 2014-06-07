// ==UserScript==
// @name           WoW Europe auto-fill parental controls password
// @namespace      http://henrik.nyh.se
// @description    Auto-fill the parental controls password in the European World of Warcraft account management. Obviously you'd typically only use this on a computer the parentally controlled one has no access to. Combine this with the general Autologin script, using an URL like https://www.wow-europe.com/login/login?service=https%3A%2F%2Fwww.wow-europe.com%2Faccount%2Fparental-control-schedule.html#sAUTOLOGIN&username=foo&password=bar
// @include        https://www.wow-europe.com/account/parental-control-schedule.html*
// ==/UserScript==

// Put the parental controls password here
var password = "for the horde!";

function xps(x) { return document.evaluate(x, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; };
var input = xps("//input[@name='password']");
input.value = password;
