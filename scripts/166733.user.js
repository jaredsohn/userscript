// ==UserScript==
// @name           Miniclip - remover of "leaving page confirmation popups"
// @description    This script stops javascript functions that stops you from leaving a page. 
// @include        *miniclip.*
// ==/UserScript==

(function() {
      unsafeWindow.onbeforeunload = null;
      unsafeWindow.onunload = null;
})();