// ==UserScript==
// @name           TV Tropes Warning
// @namespace      http://userscripts.org/scripts/show/74582
// @description    Adds warning to links leading to tvtropes.org
// @include        *
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; ++i) {
  if (links[i].href.match("tvtropes.org") != null) {
    links[i].innerHTML += " [Warning: TVTropes Detected!]";
  }
}