// ==UserScript==
// @name           BlockUnwantedEvents
// @namespace      http://wwwlawrencealan.com/
// @description    Blocks all unload functions and stops all window moving functions.  Based on the BlockUnloadEvents script.
// @include        *
// ==/UserScript==
(function() {
      unsafeWindow.onbeforeunload = null;
      unsafeWindow.onunload = null;
      unsafeWindow.resizeTo = null;
      unsafeWindow.moveTo = null;
})();