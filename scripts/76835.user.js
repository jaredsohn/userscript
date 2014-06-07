// ==UserScript==
// @name           automatic deletion for GAEdatastore
// @namespace      http://twitter.com/ichiyonnana
// @include        https://appengine.google.com/datastore/explorer*&limit=199*
// ==/UserScript==

document.getElementsByTagName("input")[11].click();
document.getElementsByTagName("form")[3].submit();