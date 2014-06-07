// ==UserScript==
// @name           Auto Add Feed to Google Reader
// @description    Bypasses the choice to add a feed to Google homepage or Google Reader, directly adding it to Google Reader.
// @include        http://www.google.com/ig/add?feedurl=*
// ==/UserScript==

location.replace(document.evaluate("//a[contains(@href, 'addtoreader')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.href);
