// ==UserScript==
// @name           bw's Link Selection Fix
// @description    Workaround for Bug 215926. [https://bugzilla.mozilla.org/show_bug.cgi?id=215926]
// @author         blackwind
// @namespace      blackwind.org
// @icon           http://blackwind.org/favicon.ico
// @include        *
// ==/UserScript==

(function() {
  document.addEventListener("click", function(event) {
    if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      if (window.getSelection() != "")
        event.preventDefault();
    }
  });
})();