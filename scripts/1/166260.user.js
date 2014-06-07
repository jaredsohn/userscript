// ==UserScript==
// @name           bw's Paste Buddy
// @description    Eradicates javascript code that disallows pasting.
// @author         blackwind
// @namespace      blackwind.org
// @icon           http://blackwind.org/favicon.ico
// @include        *
// ==/UserScript==

(function() {
  for each (var tag in ["input", "textarea"]) {
    for each (var item in document.getElementsByTagName(tag)) {
      if (typeof(item.getAttribute) == "function") {
        if (/^return false/i.exec(item.getAttribute("onpaste")))
          item.removeAttribute("onpaste");
      }
    }
  }
})();
