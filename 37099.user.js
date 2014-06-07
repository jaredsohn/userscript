// ==UserScript==
// @name           Delicious.com - Auto-Highlight Bundled Tags
// @namespace      http://murklins.talkoncorners.net
// @description    Automatically checks off "Highlight tags already in another bundle" anytime the bundle edit page is loaded.
// @include https://secure.delicious.com/settings/tags/bundle/edit*
// ==/UserScript==

(function() {
  highlightCheckbox = document.getElementById("highlight").click();
})();