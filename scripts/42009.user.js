// ==UserScript==
// @name           Scholars' Portal -> PDF full text 
// @namespace      geological-supplies.com
// @include        http://scholarsportal.info*/cgi-bin/sciserv.pl?collection=journals&*
// ==/UserScript==

links = document.getElementsByTagName("a");
window.location.href = links[10].href;