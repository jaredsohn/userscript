// ==UserScript==
// @name           Market Lumiro add link
// @namespace      http://aivean.com
// @description    Adds link to search results
// @include        http://market.lumiro.net/whosell.php*
// ==/UserScript==

var link = document.createElement('a');
link.setAttribute('href', window.location);
link.appendChild(document.createTextNode(window.location));

 document.body.appendChild(link);