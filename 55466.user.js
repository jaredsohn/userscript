// ==UserScript==
// @name           TempInbox - Check Terms of Service
// @namespace      http://userscripts.org/users/99643
// @description    automatically checks the Terms of Service checkbox on TempInbox.com
// @include        http://*tempinbox.com/
// @include        http://*beefmilk.com/
// @include        http://*lookugly.com
// @include        http://*smellfear.com
// ==/UserScript==

document.evaluate("//form/p[2]/input[1]", document, null, 9, null).singleNodeValue.checked="checked";